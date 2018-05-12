PIDS=()

function close {
  echo ${PIDS[*]} | tr " " "\n" | xargs kill -9 > /dev/null
}

trap close EXIT

if [[ $REPLAY_MODE ]]; then
  export REPLAY_PORT=${REPLAY_PORT:-$(jot -r 1 4041 4999)}
  scripts/test_server.js&
  PIDS+=($!)
fi

detox test -c ios.debug --platform ios
