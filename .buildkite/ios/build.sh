set -e
set -o pipefail

ARGS=()
OPTIONS=(CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY=)
SCHEME=EmCasa

if [[ ! -z "$IOS_XCCONFIG_FILE" ]]; then ARGS+=(-xcconfig "$IOS_XCCONFIG_FILE"); fi
case $BUILD_PROFILE in
  debug) CONFIGURATION=Debug;;
  production) CONFIGURATION=Release;;
  beta)
    CONFIGURATION=Beta
    SCHEME=EmCasa-Beta
    ;;
esac

echo "Building ipa for ${BUILD_PROFILE}"

cd $ROOT/ios && xcodebuild \
  -scheme EmCasa \
  -archivePath $ROOT/ios/build/EmCasa.xcarchive \
  -workspace $ROOT/ios/EmCasa.xcworkspace \
  -configuration $CONFIGURATION \
  -destination "generic/platform=iOS" \
  ${ARGS[*]} ${OPTIONS[*]} \
  clean archive | tee $ROOT/tmp/logs/ios.build.log | xcpretty
