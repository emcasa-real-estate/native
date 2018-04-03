set -e

BUILD_TYPE=debug

echo $PWD

case $1 in
  help|--help)
    echo "Usage: test.e2e.sh [platform] [-r|--release]"
    exit 0
  ;;
  android) PLATFORM=$1; shift;;
  -*|"") PLATFORM=$([[ $OSTYPE == "darwin"* ]] && echo "ios" || echo "android");;
  *) >&2 echo "Invalid platform $1"; exit 1;;
esac

while true; do
case $1 in
  -r|--release) BUILD_TYPE=release; shift;;
  *) break;;
esac
done

if [[ `nc -z localhost 8081 || echo \$?` -eq 1 ]]; then
  echo "Starting metro bundler"
  react-native start > /dev/null &
fi

detox test -c "$PLATFORM.$BUILD_TYPE" --platform $PLATFORM --reuse

if [[ $! ]]; then kill -9 $!; fi
