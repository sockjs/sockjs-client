#!/bin/sh
if [ -e .pidfile.pid ]; then
    kill `cat .pidfile.pid`
    rm .pidfile.pid
fi

while [ 1 ]; do
    while [ 1 ]; do
        echo " [*] Running http server"
        make tests &
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
