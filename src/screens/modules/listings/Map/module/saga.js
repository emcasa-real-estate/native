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
import {Alert} from 'react-native'

import * as navigation from '@/screens/modules/navigation'
import {getMapScreen, isWithinBounds} from './selectors'
import * as actions from './index'
import MapScreen from '../index'

const createWatchChannel = () =>
  eventChannel((emit) => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => emit(position),
      () => emit(END),
      {
        maximumAge: 1000,
        distanceFilter: 10
      }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  })

const mapScreenAppeared = ({type, name}) =>
  type === navigation.SCREEN_APPEARED && name === MapScreen.screenName

const mapScreenDisappeared = ({type, name}) =>
  type === navigation.SCREEN_DISAPPEARED && name === MapScreen.screenName

function* updatePosition({coords}) {
  yield put(actions.updatePosition(coords))
}

function* watchPosition() {
  const shouldWatch = yield select(isWithinBounds)
  if (!shouldWatch) {
    Alert.alert(
      'Fora da área de cobertura',
      'A sua região ainda não é coberta pela EmCasa.'
    )
    yield put(actions.unwatchPosition())
    return
  }
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

function* terminateMapScreen() {
  yield put(actions.clear())
}

export default function* listingsMapScreenSaga() {
  yield all([
    takeEvery(mapScreenAppeared, initializeMapScreen),
    takeEvery(mapScreenDisappeared, terminateMapScreen),
    takeLatest(actions.WATCH_POSITION, watchPosition),
    takeLatest(actions.REQUEST_POSITION, requestPosition)
  ])
}
