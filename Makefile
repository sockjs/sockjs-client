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

tests/html/lib/test-factory.js: tests/html/src/test-factory.coffee
	coffee -o tests/html/lib/ -c --bare $<

tests/html/lib/test-run.js: tests/html/src/test-run.coffee
	coffee -o tests/html/lib/ -c --bare $<

test: tests
tests: tests/html/lib/sockjs.js tests/html/lib/test-factory.js tests/html/lib/test-run.js
	node tests/server.js
