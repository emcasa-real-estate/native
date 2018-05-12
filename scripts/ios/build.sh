#!/bin/sh
cd ios && xcodebuild \
  -scheme EmCasa \
  -archivePath $PWD/ios/build/EmCasa.xcarchive \
  -workspace $PWD/ios/EmCasa.xcworkspace \
  -configuration Debug \
  -destination "generic/platform=iOS" \
  -sdk iphonesimulator \
  -derivedDataPath $PWD/ios/build | tee $PWD/tmp/logs/ios.build.log | xcpretty
