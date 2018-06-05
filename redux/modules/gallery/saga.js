import {all, fork} from 'redux-saga/effects'

import data from './data/saga'
import upload from './feed/saga'

export default function* gallerySaga() {
  yield all([fork(data), fork(upload)])
}
