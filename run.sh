#!/bin/sh
if [ -e .pidfile.pid ]; then
    kill `cat .pidfile.pid`
    rm .pidfile.pid
fi

while [ 1 ]; do
    echo " [*] Generating javascript"
    node bin/render.js lib/main.js > sockjs.js && \
        coffee -o tests/ -c --bare tests-src/*.coffee && \
        node bin/minify.js sockjs.js > sockjs.min.js && \
        node bin/minify.js --pretty sockjs.js > sockjs.pretty.js && \
    while [ 1 ]; do
        echo " [*] Running http server"
        node bin/simple_http_server.js &
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
