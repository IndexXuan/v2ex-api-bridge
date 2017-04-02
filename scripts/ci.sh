#!/bin/bash
# copy from: https://github.com/vuejs/vue/blob/dev/build/ci.sh

set -e
npm test

# report coverage stats for non-PRs
if [[ -z $CI_PULL_REQUEST ]]; then
  cat ./coverage/lcov.info | ./node_modules/.bin/codecov
fi
