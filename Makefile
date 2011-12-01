.PHONY: all build tests test serve clean

all: sockjs.js

build: sockjs.js sockjs.min.js

sockjs.js: lib/*js version
	@coffee -v > /dev/null
	coffee bin/render.coffee --set-version $(VER) lib/all.js > $@

sockjs.min.js: lib/*js version
	@coffee -v > /dev/null
	coffee bin/render.coffee --set-version $(VER) --minify lib/all.js > $@

sockjs.pretty.js: lib/*js version
	@coffee -v > /dev/null
	coffee bin/render.coffee --set-version $(VER) --minify --pretty lib/all.js > $@

tests/html/lib/sockjs.js: sockjs.js
	cp $< $@

tests/html/lib/%.js: tests/html/src/%.coffee
	@coffee -v > /dev/null
	coffee -o tests/html/lib/ -c --bare $<

build_tests: tests/html/lib/sockjs.js tests/html/lib/tests.js \
		tests/html/lib/domtests.js tests/html/lib/endtoendtests.js

test: tests
tests: build_tests
	node tests/server.js


serve:
	@if [ -e .pidfile.pid ]; then			\
		kill `cat .pidfile.pid`;		\
		rm .pidfile.pid;			\
	fi

	@while [ 1 ]; do					\
		make build_tests;				\
		echo " [*] Running http server";		\
		make test &					\
		SRVPID=$$!;					\
		echo $$SRVPID > .pidfile.pid;			\
		echo " [*] Server pid: $$SRVPID";		\
		inotifywait -r -q -e modify . ../sockjs-node;	\
		kill `cat .pidfile.pid`;			\
		rm -f .pidfile.pid;				\
		sleep 0.1;					\
	done

clean:
	rm -f sockjs*.js tests/html/lib/*.js

# To release:
#   1) commit everything you need
#   2) amend 'version' file (don't commit)
#   3) run 'make tag', and git push/git push --tag as suggested
#   4) run 'make upload', and suggested commands

RVER:=$(shell cat version)
VER:=$(shell ./VERSION-GEN)
# The first two dots: 1.2.3 -> 1.2
MAJVER:=$(shell echo $(VER)|sed 's|^\([^.]\+\)[.]\([^.]\+\)[.]\([^.]\+\)[.].*$$|\1.\2|' )

.PHONY: tag upload
tag:
	make clean
	-git tag -d v$(RVER)
	git commit $(TAG_OPTS) version Changelog -m "Release $(RVER)"
	git tag -a v$(RVER) -m "Release $(RVER)"
	@echo ' [*] Now run'
	@echo 'git push; git push --tag'

upload: build
	[ -e ../sockjs-client-gh-pages ] || 				\
		git clone `git remote -v|tr "[:space:]" "\t"|cut -f 2`	\
			--branch gh-pages ../sockjs-client-gh-pages
	(cd ../sockjs-client-gh-pages; git pull;)
	for f in sock*js; do						\
		cp $$f ../sockjs-client-gh-pages/`echo $$f|sed 's|\(sockjs\)\(.*[.]js\)|\1-$(VER)\2|g'`; \
	done
	for f in sock*js; do						\
		cp $$f ../sockjs-client-gh-pages/`echo $$f|sed 's|\(sockjs\)\(.*[.]js\)|\1-$(MAJVER)\2|g'`; \
	done
	for f in sock*js; do						\
		cp $$f ../sockjs-client-gh-pages/`echo $$f|sed 's|\(sockjs\)\(.*[.]js\)|\1-latest\2|g'`; \
	done
	(cd ../sockjs-client-gh-pages; git add sock*js; git commit sock*js -m "Release $(VER)";)
	(cd ../sockjs-client-gh-pages; node generate_index.js > index.html; git add index.html; git commit index.html --amend -m "Release $(VER)";)
	@echo ' [*] Now run: '
	@echo '(cd ../sockjs-client-gh-pages; git push; )'
	@echo '(cd ../sockjs-client-gh-pages; 	\
		s3cmd sync . s3://sockjs --acl-public --exclude ".*" --include index.html --include "sockjs*.js"; );'
