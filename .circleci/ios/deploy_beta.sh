set -eu

PATH="$PATH:$(dirname "$(xcode-select -p)")/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/"
export FASTLANE_USER=$APPLE_ID
export FASTLANE_PASSWORD=$APPLE_PASSWORD

bundle exec fastlane run crashlytics \
  ipa_path:"$PWD/ios/build/EmCasa-Beta.ipa" \
  api_token:"$FABRIC_API_KEY" \
  build_secret:"$FABRIC_BUILD_SECRET" \
  groups:"$TESTER_GROUPS"
