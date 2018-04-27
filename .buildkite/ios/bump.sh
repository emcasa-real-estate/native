set -e

cd $ROOT/ios

agvtool new-marketing-version $VERSION_NAME
agvtool new-version -all $BUILD_NUMBER
