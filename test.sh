#!/bin/sh
if [ -e .pidfile.pid ]; then
    kill `cat .pidfile.pid`
    rm .pidfile.pid
fi

while [ 1 ]; do
    echo " [*] Generating javascript"
    coffee -o tests/lib/ -c --bare tests-src/*.coffee && \
        coffee bin/render.coffee lib/all.js > tests/lib/sockjs.js && \
    while [ 1 ]; do
        echo " [*] Running http server"
        node bin/simple_http_server.js --dir tests &
        SRVPID=$!
        echo $SRVPID > .pidfile.pid

        echo " [*] Server pid: $SRVPID"
        break
    done

    inotifywait -r -q -e modify .
    kill $SRVPID
    rm -f .pidfile.pid
    # Sync takes some time, wait to avoid races.
    sleep 0.1
done
