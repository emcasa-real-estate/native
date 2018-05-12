#!/bin/sh
PATH="node_modules/.bin:$PATH"
react-native bundle \
  --platform ios \
  --entry-file index.js \
  --assets-dest ios \
  --bundle-output ios/main.jsbundle \
  $@
