export RCT_NO_LAUNCH_PACKAGER=TRUE
if [[ $BUILD_PROFILE == production ]];
then export API_URL="https://em-casa-backend.herokuapp.com";
else export API_URL="https://em-casa-backend-staging.herokuapp.com"; fi
