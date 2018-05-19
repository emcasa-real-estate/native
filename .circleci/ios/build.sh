set -e
set -o pipefail

BUILD_CONFIGURATION=${BUILD_CONFIGURATION:-Debug}

buildArgs=()
buildScheme=EmCasa

if [[ ! -z "$IOS_XCCONFIG_FILE" ]]; then buildArgs+=(-xcconfig "$IOS_XCCONFIG_FILE"); fi
if [[ $BUILD_CONFIGURATION == "Beta" ]]; then
    export BUNDLE_IDENTIFIER_SUFFIX="-beta"
    buildScheme=EmCasa-Beta
    ;;
esac

cd ios && xcodebuild \
  -scheme $buildScheme \
  -archivePath build/EmCasa.xcarchive \
  -workspace EmCasa.xcworkspace \
  -configuration $BUILD_CONFIGURATION \
  -destination "generic/platform=iOS" \
  ${buildArgs[*]}
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY="" \
  clean archive | tee $ROOT/tmp/logs/ios.build.log | xcpretty
