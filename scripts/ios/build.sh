#!/bin/sh
set +ex
ROOT=$PWD

BUNDLE_IDENTIFIER_SUFFIX=-beta cd ios && xcodebuild \
  -scheme EmCasa \
  -workspace $ROOT/ios/EmCasa.xcworkspace \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath $ROOT/ios/build | tee $ROOT/tmp/logs/ios.build.log | xcpretty
