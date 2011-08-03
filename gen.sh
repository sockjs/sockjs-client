#!/bin/sh
T0=`date +%s%0N`
echo " [*] Generating javascript"
coffee bin/render.coffee lib/all.js > sockjs.js && \
coffee bin/render.coffee --minify lib/all.js > sockjs.min.js && \
coffee bin/render.coffee --minify --pretty lib/all.js > sockjs.pretty.js && \
T1=`date +%s%0N`
TDMS=$(( ($T1-$T0) / 1000000))
echo " [*] ok $TDMS ms"
