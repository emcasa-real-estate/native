import {takeLatest, all, fork, select} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import * as navigation from '@/screens/modules/navigation'
import * as auth from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import * as actions from './index'

const analytics = Firebase.analytics()

function logEvent({name, params}) {
  analytics.logEvent(name, params)
}

function identifySession({data}) {
  analytics.setUserId(data.id.toString())
}

function* initialize() {
  const data = yield select(getUser)
  analytics.setAnalyticsCollectionEnabled(true)
  analytics.setMinimumSessionDuration(10 * 1000)
  analytics.setSessionTimeoutDuration(15 * 60 * 1000)
  if (data) yield fork(identifySession, {data})
}

export default function* crashlyticsSaga() {
  yield all([
    takeLatest(actions.LOG_EVENT, logEvent),
    takeLatest(auth.SUCCESS, identifySession),
    fork(initialize)
  ])
}
