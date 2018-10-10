#!/usr/bin/env bash

#  ╺┳╸┏━╸┏━┓╺┳╸
#   ┃ ┣╸ ┗━┓ ┃
#   ╹ ┗━╸┗━┛ ╹

# Ensure that we have built the application so snippets mocks
# and integration tests work.
if [[ ! -d build/ ]]; then npm run build; fi

node_modules/.bin/jest "$@"
