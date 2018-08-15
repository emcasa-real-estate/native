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

import {logEvent} from '@/redux/modules/firebase/analytics'
import {getUser} from '@/redux/modules/auth/selectors'
import * as actions from './index'
import {getToken} from './selectors'

const messaging = Firebase.messaging()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

function* updateToken({token}) {
  const _user = yield select(getUser)
  const user = _user ? {id: _user.id, name: _user.name} : undefined
  yield put(logEvent('debug_device_token_updated', {token, user}))
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
    // if (token !== currentToken)
    yield put(actions.updateToken(token))
    oldToken = token
  } while ((token = yield take(channel)))
}

function* initializePermission() {
  const enabled = yield call(() => messaging.hasPermission())
  yield put(actions.updatePermission(enabled))
}

export default function* fcmSaga() {
  yield all([
    takeLatest(actions.REQUEST_PERMISSION, requestPermission),
    takeLatest(actions.UPDATE_TOKEN, updateToken),
    fork(initializePermission),
    fork(initializeToken)
  ])
}
