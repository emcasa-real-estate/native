import {all, fork, take} from 'redux-saga/effects'

import {READY} from '@/lib/client'
import analytics from './analytics/saga'
import crashlytics from './crashlytics/saga'
import messaging from './messaging/saga'
import notifications from './notifications/saga'

export default function* firebaseSaga() {
  yield take(READY)
  yield all([
    fork(analytics),
    fork(crashlytics),
    fork(messaging),
    fork(notifications)
  ])
}
