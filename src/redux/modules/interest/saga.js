import {all, fork} from 'redux-saga/effects'

import types from './types/saga'
import form from './form/saga'

export default function* listingsSaga() {
  yield all([fork(types), fork(form)])
}
