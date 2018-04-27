set -e
set -o pipefail

ARGS=()
OPTIONS=(CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY=)

if [[ ! -z "$IOS_XCCONFIG_FILE" ]]; then ARGS+=(-xcconfig "$IOS_XCCONFIG_FILE"); fi

SCHEME=EmCasa
case $BUILD_PROFILE in
  debug) CONFIGURATION=Debug;;
  production) CONFIGURATION=Release;;
  beta)
    CONFIGURATION=Beta
    SCHEME=EmCasa-Beta
    ;;
esac

cd $ROOT/ios && xcodebuild \
  -scheme EmCasa \
  -archivePath $ROOT/ios/build/EmCasa.xcarchive \
  -workspace $ROOT/ios/EmCasa.xcworkspace \
  -configuration $CONFIGURATION \
  -destination "generic/platform=iOS" \
  ${ARGS[*]} ${OPTIONS[*]} \
  archive | tee $ROOT/tmp/logs/ios.build.log | xcpretty
