import {all, fork} from 'redux-saga/effects'

import crashlytics from './crashlytics/saga'

export default function* firebaseSaga() {
  yield all([fork(crashlytics)])
}
