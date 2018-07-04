import {all, fork} from 'redux-saga/effects'

import data from './data/saga'
import relations from './relations/saga'

export default function* listingsSaga() {
  yield all([fork(data), fork(relations)])
}
