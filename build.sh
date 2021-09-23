#!/bin/bash
set -e

if [ "x${BROWSER}" = "x" ]; then
	npm run lint
	npm test
else
	exit 1
fi
