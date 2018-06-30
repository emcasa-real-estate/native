import {takeLatest, all, fork, select} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {getScreenByName} from '@/screens/modules/screens'
import * as navigation from '@/screens/modules/navigation'
import * as auth from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import * as actions from './index'
import analyticsEventsSaga from './events'

const analytics = Firebase.analytics()

function logEvent({name, params}) {
  analytics.logEvent(name, params)
}

function identifySession({data}) {
  if (data) analytics.setUserId(data.id.toString())
}

function logCurrentScreen({name}) {
  analytics.setCurrentScreen(name, getScreenByName(name).displayName)
}

function* initialize() {
  const data = yield select(getUser)
  analytics.setAnalyticsCollectionEnabled(true)
  analytics.setMinimumSessionDuration(10 * 1000)
  analytics.setSessionTimeoutDuration(15 * 60 * 1000)
  if (data) yield fork(identifySession, {data})
}

export default function* analyticsSaga() {
  yield all([
    takeLatest(actions.LOG_EVENT, logEvent),
    takeLatest(auth.SUCCESS, identifySession),
    takeLatest(navigation.SCREEN_APPEARED, logCurrentScreen),
    fork(analyticsEventsSaga),
    fork(initialize)
  ])
}
