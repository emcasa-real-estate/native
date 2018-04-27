if [[ $BUILD_PROFILE == production ]];
then export CODESIGN_PROFILE=app-store;
else export CODESIGN_PROFILE=ad-hoc; fi
if [[ $BUILD_PROFILE == beta ]];
then export BUNDLE_ID_SUFFIX="-beta"; fi

export IOS_PROVISIONING_FILE=$(printf $IOS_PROVISIONING_FILE $CODESIGN_PROFILE)
