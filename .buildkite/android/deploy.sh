set -e

case $PROFILE in
  beta)
    bundle exec fastlane android beta bin:$ROOT/android/app/build/outputs/apk/app-release.apk groups:"$TESTER_GROUPS"
    ;;
  production)
    cd android && ./gradlew publishApkRelease
    ;;
esac
