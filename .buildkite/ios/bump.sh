set -e

cd $ROOT/ios

echo "Bumping version to $VERSION_NAME ($BUILD_NUMBER)"

agvtool new-marketing-version $VERSION_NAME
agvtool new-version -all $BUILD_NUMBER
