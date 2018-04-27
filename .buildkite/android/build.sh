set -e

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

