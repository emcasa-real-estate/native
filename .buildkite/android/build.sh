set -e

case $PROFILE in
  debug)
    cd android && ./gradlew assembleDebug
    ;;
  beta|production)
    bundle exec fastlane android build signed:true
    ;;
esac

