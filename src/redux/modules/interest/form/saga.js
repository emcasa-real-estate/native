import {put, call, all, takeLatest, getContext} from 'redux-saga/effects'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import * as api from '@/lib/services/interest'
import * as actions from './index'

function* request({id, params}) {
  try {
    const graphql = yield getContext('graphql')
    const {
      credentials: {jwt}
    } = yield call([graphql, graphql.query], {
      query: GET_USER_PROFILE
    })
    const response = yield call(api.create, id, params, {jwt})
    yield put(actions.success(response.data))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

export default function* interestFormSaga() {
  yield all([takeLatest(actions.REQUEST, request)])
}
