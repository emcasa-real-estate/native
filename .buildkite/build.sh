set -e

RN_PORT=$(jot -r 1 8082 9000)

react-native-port-patcher --new-port $RN_PORT

echo "Starting bundler on port $RN_PORT"
react-native start --port $RN_PORT >tmp/logs/$PLATFORM.bundler.log &
RN_PID=$!

cleanup() {
  echo "Closing bundler"
  kill -9 $RN_PID 2>/dev/null
}

trap cleanup EXIT

export RCT_NO_LAUNCH_PACKAGER=TRUE
