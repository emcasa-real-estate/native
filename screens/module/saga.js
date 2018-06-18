import {fork, all} from 'redux-saga/effects'

import navigation from './navigation/saga'
import context from './context/saga'

export default function* screenSaga() {
  yield all([fork(navigation), fork(context)])
}
