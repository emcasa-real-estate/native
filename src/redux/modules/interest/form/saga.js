import {put, call, all, select, takeLatest} from 'redux-saga/effects'

import * as api from '@/lib/services/interest'
import {getToken} from '../../auth/selectors'
import * as actions from './index'

function* request({id, params}) {
  try {
    const jwt = yield select(getToken)
    const response = yield call(api.create, id, params, {jwt})
    yield put(actions.success(response.data))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

export default function* interestFormSaga() {
  yield all([takeLatest(actions.REQUEST, request)])
}
