set -eu

PATH="$PATH:$(dirname "$(xcode-select -p)")/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/"
export FASTLANE_USER=$APPLE_ID
export FASTLANE_PASSWORD=$APPLE_PASSWORD

bundle exec fastlane deliver \
  --skip_metadata --skip_screenshots \
  --ipa "$PWD/ios/build/EmCasa.ipa" \
  --app $APPLE_APP_ID \
  --username $APPLE_ID \
  --app_version $VERSION_NAME \
  --app_identifier com.EmCasa.native

