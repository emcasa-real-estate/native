import {takeLatest, all, fork, select} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {getUser} from '@/redux/modules/auth/selectors'
import * as auth from '@/redux/modules/auth'
import * as actions from './index'

const crashlytics = Firebase.crashlytics()

function reportError({error, code}) {
  let message = error.trace || error.message
  if (typeof message !== 'string') message = message.toString()
  crashlytics.recordError(code, message)
}

function identifySession({data}) {
  if (!data) return
  crashlytics.setUserIdentifier(data.id.toString())
}

function* initialize() {
  const data = yield select(getUser)
  yield fork(identifySession, {data})
}

export default function* crashlyticsSaga() {
  yield all([
    takeLatest(auth.SUCCESS, identifySession),
    takeLatest(actions.REPORT_ERROR, reportError),
    fork(initialize)
  ])
}
