import {all, fork} from 'redux-saga/effects'

import analytics from './analytics/saga'
import crashlytics from './crashlytics/saga'
import messaging from './messaging/saga'
import notifications from './notifications/saga'

export default function* firebaseSaga() {
  yield all([
    fork(analytics),
    fork(crashlytics),
    fork(messaging),
    fork(notifications)
  ])
}
