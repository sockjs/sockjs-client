.PHONY: all build tests test

all: sockjs.js

build: sockjs.js sockjs.min.js sockjs.pretty.js

sockjs.js: lib/*js
	coffee bin/render.coffee lib/all.js > $@

sockjs.min.js: lib/*js
	coffee bin/render.coffee --minify lib/all.js > $@

sockjs.pretty.js: lib/*js
	coffee bin/render.coffee --minify --pretty lib/all.js > $@

tests/html/lib/sockjs.js: sockjs.js
	cp $< $@

tests/html/lib/tests.js: tests/html/src/tests.coffee
	coffee -o tests/html/lib/ -c --bare $<

test: tests
tests: tests/html/lib/sockjs.js tests/html/lib/tests.js
	node tests/server.js
