if [[ $BUILDKITE_BRANCH == "master" ]];
then export TESTER_GROUPS=$BETA_TESTERS;
else export TESTER_GROUPS=$ALPHA_TESTERS; fi

if [[ $PROFILE == "production" ]];
then export VERSION_NAME=${VERSION_NAME_PRODUCTION:-$VERSION_NAME}; fi
