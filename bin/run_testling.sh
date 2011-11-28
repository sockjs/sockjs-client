#!/bin/bash
# Include a script with credentails:
. .testling_env.sh
# This script should set few Testling variables and should look more
# or less like that:
#
# TESTLING_CRED=my@email.com:password
# TUNNEL_PORT=12345
# TUNNEL_USER=my_email_com
#
# First, you need to create browserling.com account. Set TESTLING_CRED
# to email:password. Additionally, you must create a testling tunnel
# using commands like that:
#
# curl -u $TESTLING_CRED "testling.com/tunnel" -sST ~/.ssh/id_rsa.pub
# curl -u $TESTLING_CRED "testling.com/tunnel/open"
#
# After that set TUNNEL_PORT and TUNNEL_USER accordingly.
#
#

browsers=(
    # iexplore/6.0
    # iexplore/7.0
    # iexplore/8.0
    # iexplore/9.0
    # chrome/4.0
    # chrome/5.0
    # chrome/6.0
    # chrome/7.0
    # chrome/8.0
    # chrome/9.0
    # chrome/10.0
    # chrome/11.0
    # chrome/12.0
    # chrome/13.0
    # chrome/14.0
    # chrome/15.0
    chrome/canary
    # firefox/3.0
    # firefox/3.5
    # firefox/3.6
    # firefox/4.0
    # firefox/5.0
    # firefox/6.0
    # firefox/7.0
    # firefox/8.0
    # firefox/nightly
    # opera/10.0
    # opera/10.5
    # opera/11.0
    # opera/11.5
    # opera/next
    # safari/5.0.5
    # safari/5.1
)

BROWSERS=`echo ${browsers[@]}|tr ' ' ','`


if [ "$TESTLING_CRED" = "" ] || \
    [ "$TUNNEL_PORT" = "" ] || \
    [ "$TUNNEL_USER" = "" ]; then
    echo "Error: Please set following env variables: "\
         "TESTLING_CRED TUNNEL_PORT TUNNEL_USER"
    exit 1
fi


PIDFILE=.sshpidfile.pid

if [ -e $PIDFILE ]; then
    kill `cat $PIDFILE`
    rm $PIDFILE
fi



cat > testling.js << EOF
var test = require('testling');
test('Testling Test Runner', function (t) {
    t.createWindow('http://tunnel.browserling.com:$TUNNEL_PORT/unittests.html',
        function(win, jq) {
            jq(function() {
                if(typeof win.QUnit === 'undefined') {
                    t.log("No QUnit object in the window!");
                    t.end();
                } else {
                    var q = win.QUnit;
                    var module_name = '[unknown]';
                    q.begin = function() {
                        t.log(' [*] Start');
                    };
                    q.moduleStart = function(o) {
                        module_name = o.name;
                    };
                    q.log = function(o) {
                        var x = module_name + ': ' + o.message;
                        t.ok(o.result, x);
                        if(!o.result) {
                            t.log(" [-] Failed: " + x);
                        }
                    };
                    q.done = function(o) {
                        t.log(' [*] Done ' + o.failed + ' ' + o.passed +
                              ' ' + o.total + ' ' + o.runtime);
                        t.end();
                    };
                }
            });
        });
    // Dead man's switch
    setTimeout(function(){
        t.log("Emergency timeout ocurred");
        t.end();
    }, 5000);
});
EOF



ssh -o "VerifyHostKeyDNS no" \
    -NR $TUNNEL_PORT:localhost:8080 $TUNNEL_USER@tunnel.browserling.com &
SSHPID=$!
echo $SSHPID > $PIDFILE

echo "[*] Running against: ${browsers[@]}"
curl -u $TESTLING_CRED -sSNT testling.js \
    "testling.com/?browsers=$BROWSERS&noinstrument=test.js"

kill $SSHPID
wait $SSHPID
rm $PIDFILE

curl -sSNu $TESTLING_CRED "testling.com/browsers"|tail -n 1
