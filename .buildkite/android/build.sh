set -e

echo "Building apk for $BUILD_PROFILE"

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

