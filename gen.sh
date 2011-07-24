#!/bin/sh
echo " [*] Generating javascript"
coffee bin/render.coffee lib/all.js > sockjs.js && \
coffee bin/render.coffee --minify lib/all.js > sockjs.min.js && \
coffee bin/render.coffee --minify --pretty lib/all.js > sockjs.pretty.js && \
echo " [*] ok"
