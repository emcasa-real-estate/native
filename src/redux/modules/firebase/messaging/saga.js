import {eventChannel, END} from 'redux-saga'
import {all, call, put, fork, take, select} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {getUser} from '@/redux/modules/auth/selectors'
import * as auth from '@/redux/modules/auth'
import * as actions from './index'

const messaging = Firebase.messaging()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

function* initializeToken() {
  let token = yield call(messaging.getToken)
  if (token) yield put(actions.updatePermission(token))
  while ((token = yield take(tokenRefreshChannel())))
    yield put(actions.updatePermission(token))
}

function* initializePermission() {
  let token = yield call(messaging.getToken)
  if (token) yield put(actions.updatePermission(token))
  while ((token = yield take(tokenRefreshChannel())))
    yield put(actions.updatePermission(token))
}

export default function* crashlyticsSaga() {
  yield all([fork(initializeToken), fork(initializePermission)])
}
