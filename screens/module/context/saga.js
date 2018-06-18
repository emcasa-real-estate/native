import {put, takeEvery} from 'redux-saga/effects'

import * as navigation from '../navigation'
import * as actions from './index'

function* clearContext({name}) {
  yield put(actions.clearContext(name)())
}

export default function* screenContextSaga() {
  yield takeEvery(navigation.SCREEN_DISAPPEARED, clearContext)
}
