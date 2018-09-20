#!/bin/bash
set -e

if [ "x${BROWSER}" = "x" ]; then
	npm run lint
	npm test
elif [ "${TRAVIS_SECURE_ENV_VARS}" = "true" ]; then
	npm run test:browser_remote
else
	exit 1
fi
