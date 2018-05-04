if [[ $BUILD_PROFILE == production ]];
then export ICON_PATH=$ROOT/assets/img/icon-$PLATFORM.png;
else export ICON_PATH=$ROOT/assets/img/icon-$PLATFORM-staging.png; fi
