if [[ $PROFILE != "production" && $VERSION_TAG ]];
then export VERSION_NAME="$VERSION_NAME-$VERSION_TAG"; fi
