import {put, call, fork, all, takeLatest} from 'redux-saga/effects'

import * as api from '@/lib/services/interest'
import * as actions from './index'

function* request() {
  try {
    const response = yield call(api.types)
    yield put(actions.success(response.data))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

export default function* interestTypesSaga() {
  yield all([
    takeLatest(actions.REQUEST, request),
    // Load data as soon as possible
    fork(request)
  ])
}
