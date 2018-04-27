BUILD_NUMBER_PATTERN='(versionCode) ([[:digit:]]*)'
VERSION_NAME_PATTERN='(versionName) "(.*)"'

sed -Ei '' "s/$BUILD_NUMBER_PATTERN/\1 $BUILD_NUMBER/" $ROOT/android/app/build.gradle
sed -Ei '' "s/$VERSION_NAME_PATTERN/\1 \"$VERSION_NAME\"/" $ROOT/android/app/build.gradle
