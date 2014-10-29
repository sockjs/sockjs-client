
testbundle:
	@./node_modules/.bin/gulp testbundle

test:
	@if [ "x$(BROWSER_NAME)" = "x" ]; then make test-node; else make test-zuul; fi

test-node:
	@./node_modules/.bin/mocha \
		tests/node.js

test-zuul: testbundle
	@if [ "x$(BROWSER_PLATFORM)" = "x" ]; then \
		./node_modules/.bin/zuul \
		--browser-name $(BROWSER_NAME) \
		--browser-version $(BROWSER_VERSION) \
		tests/browser.js; \
		else \
		./node_modules/.bin/zuul \
		--browser-name $(BROWSER_NAME) \
		--browser-version $(BROWSER_VERSION) \
		--browser-platform "$(BROWSER_PLATFORM)" \
		tests/browser.js; \
	fi

test-local: testbundle
	@./node_modules/.bin/zuul --local 9090 -- tests/browser.js

.PHONY: test test-node test-zuul test-local testbundle
