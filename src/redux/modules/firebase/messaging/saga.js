import {eventChannel} from 'redux-saga'
import {
  all,
  call,
  put,
  select,
  fork,
  take,
  takeLatest
} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import * as actions from './index'
import {getToken, hasPermission} from './selectors'

const messaging = Firebase.messaging()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

function* updateToken({token}) {
  /* ... */
}

function* requestPermission() {
  try {
    yield call(() => messaging.requestPermission())
    yield put(actions.updatePermission(true))
  } catch (err) {
    yield put(actions.updatePermission(false))
  }
}

function* initializeToken() {
  let token = yield call(() => messaging.getToken())
  let oldToken = yield select(getToken)
  const channel = tokenRefreshChannel()
  do {
    if (token == oldToken) continue
    yield put(actions.updateToken(token))
    oldToken = token
  } while ((token = yield take(channel)))
}

function* initializePermission() {
  const enabled = yield call(() => messaging.hasPermission())
  const currentPermission = yield select(hasPermission)
  // Request permission if it's currently denied and the user's response hasn't been cached yet
  if (!enabled && typeof currentPermission === 'undefined')
    yield put(actions.requestPermission())
  else yield put(actions.updatePermission(enabled))
}

export default function* fcmSaga() {
  yield all([
    takeLatest(actions.REQUEST_PERMISSION, requestPermission),
    takeLatest(actions.UPDATE_TOKEN, updateToken),
    fork(initializePermission),
    fork(initializeToken)
  ])
}
