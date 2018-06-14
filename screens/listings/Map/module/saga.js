import _ from 'lodash/fp'
import {eventChannel} from 'redux-saga'
import {
  put,
  call,
  all,
  race,
  fork,
  select,
  take,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
import {getMapScreen} from './selectors'
import * as actions from './index'

const createWatchChannel = () =>
  eventChannel((emit) => {
    const watchId = navigator.geolocation.watchPosition((position) =>
      emit(position)
    )
    return () => navigator.geolocation.clearWatch(watchId)
  })

function* updatePosition({coords}) {
  yield put(actions.UPDATE_USER_POSITION, coords)
}

function* watchPosition() {
  const {watching} = yield select(getMapScreen)
  if (watching) return
  const channel = yield call(createWatchChannel)
  yield race({
    watch: takeEvery(channel, updatePosition),
    cancel: take(actions.UNWATCH_POSITION)
  })
  channel.close()
}

export default function* listingsFeedSaga() {
  yield all([takeLatest(actions.WATCH_POSITION, watchPosition)])
}
