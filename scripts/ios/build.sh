#!/bin/sh
set +ex
ROOT=$PWD

if [[ $OFFLINE ]]; then
  export SKIP_BUNDLING=true
  export RCT_NO_LAUNCH_PACKAGER=TRUE
  git apply $ROOT/scripts/ios/offline.patch || true
fi

cd ios && xcodebuild \
  -scheme EmCasa \
  -workspace $ROOT/ios/EmCasa.xcworkspace \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath $ROOT/ios/build | tee $ROOT/tmp/logs/ios.build.log | xcpretty

if [[ $OFFLINE ]]; then git apply -R $ROOT/scripts/ios/offline.patch; fi
