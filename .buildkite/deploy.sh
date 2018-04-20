export RELEASE_PROFILE=beta

while true; do
case $1 in
  -p|--profile)
  export RELEASE_PROFILE=$2
  shift; shift;;
  '') break;;
  *) shift;;
esac
done

if [[ $BUILDKITE_BRANCH == "master" ]];
then export TESTER_GROUPS=$BETA_TESTERS;
else export TESTER_GROUPS=$ALPHA_TESTERS; fi

if [[ $RELEASE_PROFILE == "production" ]];
then export VERSION_NAME=${VERSION_NAME_PRODUCTION:-$VERSION_NAME}; fi
