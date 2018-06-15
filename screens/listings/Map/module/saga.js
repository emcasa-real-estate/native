import {eventChannel, END} from 'redux-saga'
import {
  put,
  call,
  cps,
  all,
  race,
  select,
  fork,
  take,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'

import * as navigation from '@/screens/module/navigation'
import {getMapScreen} from './selectors'
import * as actions from './index'
import MapScreen from '../index'

const createWatchChannel = () =>
  eventChannel((emit) => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => emit(position),
      () => emit(END),
      {timeout: process.env.NODE_ENV === 'production' ? 300 : 1000}
    )
    return () => navigator.geolocation.clearWatch(watchId)
  })

const mapScreenAppeared = ({type, name}) =>
  type === navigation.SCREEN_APPEARED && name === MapScreen.screen

const mapScreenDisappeared = ({type, name}) =>
  type === navigation.SCREEN_DISAPPEARED && name === MapScreen.screen

function* updatePosition({coords}) {
  yield put(actions.updatePosition(coords))
}

function* watchPosition() {
  const channel = yield call(createWatchChannel)
  yield takeLatest(channel, updatePosition)
  yield race({
    unwatch: take(actions.UNWATCH_POSITION),
    terminate: take(mapScreenDisappeared)
  })
  channel.close()
}

function* requestPosition({options}) {
  const {coords} = yield cps((cb) =>
    navigator.geolocation.getCurrentPosition(
      (result) => cb(null, result),
      (error) => cb(error),
      options
    )
  )
  yield put(actions.updatePosition(coords))
}

function* initializeMapScreen() {
  const {watching} = yield select(getMapScreen)
  if (watching) yield fork(watchPosition)
}

export default function* listingsMapScreenSaga() {
  yield all([
    takeEvery(mapScreenAppeared, initializeMapScreen),
    takeLatest(actions.WATCH_POSITION, watchPosition),
    takeLatest(actions.REQUEST_POSITION, requestPosition)
  ])
}
