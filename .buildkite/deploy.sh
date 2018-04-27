if [[ $BUILDKITE_BRANCH == "master" ]];
then export TESTER_GROUPS=$BETA_TESTERS;
else export TESTER_GROUPS=$ALPHA_TESTERS; fi

if [[ $PROFILE == "production" && $VERSION_TAG ]];
then export VERSION_NAME="$VERSION_NAME-$VERSION_TAG"; fi
