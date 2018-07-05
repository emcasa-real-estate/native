import {eventChannel} from 'redux-saga'
import {
  all,
  call,
  put,
  fork,
  take,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import * as actions from './index'

const messaging = Firebase.messaging()

const notifications = Firebase.notifications()

const getToken = () => messaging.getToken()

const hasPermission = () => messaging.hasPermission()

const getInitialNotification = () => notifications.getInitialNotification()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

const foregroundNotificationChannel = () =>
  eventChannel((emit) =>
    notifications.onNotification((notification) => emit({notification}))
  )

const backgroundNotificationChannel = () =>
  eventChannel((emit) =>
    notifications.onNotificationOpened(({notification, action}) =>
      emit({notification, action})
    )
  )

function* requestPermission() {
  try {
    yield call(messaging.requestPermission)
    yield put(actions.updatePermission(true))
  } catch (err) {
    yield put(actions.updatePermission(false))
  }
}

function* notificationReceived({notification}) {
  yield put(actions.notificationReceived(notification))
}

function* notificationOpened({notification, action}) {
  yield put(actions.notificationOpened(notification, action))
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

function* initializeNotification() {
  const response = yield call(getInitialNotification)
  if (response)
    yield put(
      actions.notificationInitialized(response.notification, response.action)
    )
}

export default function* fcmSaga() {
  yield all([
    takeLatest(actions.REQUEST_PERMISSION, requestPermission),
    takeEvery(backgroundNotificationChannel(), notificationOpened),
    takeEvery(foregroundNotificationChannel(), notificationReceived),
    fork(initializePermission),
    fork(initializeToken),
    fork(initializeNotification)
  ])
}
