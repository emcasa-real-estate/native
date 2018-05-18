set -e

echo "Building apk for $BUILD_PROFILE"
echo "Using backend server \"$API_URL\""

react-native bundle --platform android --dev false --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

case $BUILD_PROFILE in
  debug)
    cd android && ./gradlew assembleDebug
    ;;
  beta)
    cd android && ./gradlew assembleStaging
    ;;
  production)
    cd android && ./gradlew assembleRelease
    ;;
esac

