#!/bin/sh
set +ex
ROOT=$PWD

cd ios && xcodebuild \
  -scheme EmCasa \
  -workspace $ROOT/ios/EmCasa.xcworkspace \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath $ROOT/ios/build | tee $ROOT/tmp/logs/ios.build.log | xcpretty
