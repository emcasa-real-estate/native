import {fork, all} from 'redux-saga/effects'

import navigation from './navigation/saga'
import listings from './listings/Map/module/saga'

export default function* screenSaga() {
  yield all([fork(navigation), fork(listings)])
}
