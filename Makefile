.PHONY: all build tests test serve clean

test: node tests/server.js

# To release:
#   0) 'make prepare-release'
#   1) commit everything you need
#   2) amend 'version' file (don't commit)
#   3) run 'make tag', and git push/git push --tag as suggested
#   4) run 'make upload', and suggested commands

RVER:=$(shell cat version)
VER:=$(shell ./VERSION-GEN)
# The first two dots: 1.2.3 -> 1.2
MAJVER:=$(shell echo $(VER)|sed 's|^\([^.]\+[.][^.]\+\).*$$|\1|' )

.PHONY: prepare-release tag upload
prepare-release:
	make clean
	[ -e ../sockjs-client-gh-pages ] || 				\
		git clone `git remote -v|tr "[:space:]" "\t"|cut -f 2`	\
			--branch gh-pages ../sockjs-client-gh-pages
	(cd ../sockjs-client-gh-pages; git pull;)

#-git tag -d v$(RVER)
tag:
	git commit $(TAG_OPTS) version Changelog -m "Release $(RVER)" --allow-empty
	git tag -s v$(RVER) -m "Release $(RVER)"
	@echo ' [*] Now run'
	@echo 'git push; git push --tag'

ARTIFACTS=\
	sockjs-$(VER).js \
	sockjs-$(VER).min.js \
	sockjs-$(MAJVER).js \
	sockjs-$(MAJVER).min.js

upload: build
	echo "VER=$(VER) MAJVER=$(MAJVER)"
	cp sockjs.js     ../sockjs-client-gh-pages/sockjs-$(VER).js
	cp sockjs.min.js ../sockjs-client-gh-pages/sockjs-$(VER).min.js
	cp sockjs.js     ../sockjs-client-gh-pages/sockjs-$(MAJVER).js
	cp sockjs.min.js ../sockjs-client-gh-pages/sockjs-$(MAJVER).min.js
	(cd ../sockjs-client-gh-pages;	\
		git add $(ARTIFACTS); \
		git commit -m "Release $(VER)"; \
		node generate_index.js > index.html; \
		git add index.html; \
		git commit --amend -m "Release $(VER)";)
	@echo ' [*] Now run: '
	@echo '(cd ../sockjs-client-gh-pages; git push; )'
	@echo '(cd ../sockjs-client-gh-pages; 	\
		s3cmd put --acl-public index.html $(ARTIFACTS) s3://sockjs; );'
