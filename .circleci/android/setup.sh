set -eu

PATH=$PATH:$ANDROID_HOME/tools/bin

echo "Installing android sdk"

yes | sdkmanager "platforms;android-26"
yes | sdkmanager "build-tools;26.0.1"
yes | sdkmanager "extras;android;m2repository" "extras;google;m2repository"
