#!/bin/sh
PATH="node_modules/.bin:$PATH"
react-native bundle \
  --platform android \
  --entry-file index.js \
  --assets-dest android/app/src/main/res/
  --bundle-output android/app/src/main/assets/index.android.bundle \
  $@
