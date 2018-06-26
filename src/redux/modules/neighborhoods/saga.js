import {put, call, fork, all, takeLatest} from 'redux-saga/effects'

import * as api from '@/lib/services/neighborhoods'
import * as actions from './index'

function* request() {
  try {
    const response = yield call(api.get)
    yield put(actions.success(response.neighborhoods))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

export default function* neighborhoodsSaga() {
  yield all([
    takeLatest(actions.REQUEST, request),
    // Load data as soon as possible
    fork(request)
  ])
}
