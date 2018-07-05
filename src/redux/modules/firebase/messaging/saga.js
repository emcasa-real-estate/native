import {eventChannel, END} from 'redux-saga'
import {
  all,
  call,
  put,
  fork,
  take,
  select,
  takeLatest
} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {getUser} from '@/redux/modules/auth/selectors'
import * as auth from '@/redux/modules/auth'
import * as actions from './index'

const messaging = Firebase.messaging()

const getToken = () => messaging.getToken()

const hasPermission = () => messaging.hasPermission()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

function* requestPermission() {
  try {
    yield call(messaging.requestPermission)
    yield put(actions.updatePermission(true))
  } catch (err) {
    yield put(actions.updatePermission(false))
  }
}

function* initializeToken() {
  let token = yield call(getToken)
  const channel = tokenRefreshChannel()
  if (token) yield put(actions.updateToken(token))
  while ((token = yield take(channel))) yield put(actions.updateToken(token))
}

function* initializePermission() {
  const enabled = yield call(hasPermission)
  yield put(actions.updatePermission(enabled))
}

export default function* fcmSaga() {
  yield all([
    takeLatest(actions.REQUEST_PERMISSION, requestPermission),
    fork(initializeToken),
    fork(initializePermission)
  ])
}
