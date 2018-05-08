set -eu

PATH="$PATH:$(dirname "$(xcode-select -p)")/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/"
export FASTLANE_USER=$APPLE_ID
export FASTLANE_PASSWORD=$APPLE_PASSWORD

case $BUILD_PROFILE in
  beta)
    bundle exec fastlane run crashlytics \
      ipa_path:"$ROOT/ios/build/EmCasa-Beta.ipa" \
      api_token:"$FABRIC_API_KEY" \
      build_secret:"$FABRIC_BUILD_SECRET" \
      groups:"$TESTER_GROUPS"
    ;;
  production)
    bundle exec fastlane deliver \
      --skip_metadata --skip_screenshots \
      --ipa "$ROOT/ios/build/EmCasa.ipa" \
      --app $APPLE_APP_ID \
      --username $APPLE_ID \
      --app_version $VERSION_NAME \
      --app_identifier com.EmCasa.native
    ;;
esac

