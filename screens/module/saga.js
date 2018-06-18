import {fork, all} from 'redux-saga/effects'

import navigation from './navigation/saga'

export default function* screenSaga() {
  yield all([fork(navigation)])
}
