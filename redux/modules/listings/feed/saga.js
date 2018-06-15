import {put, call, all, select, takeLatest} from 'redux-saga/effects'

import ResponseError from '@/lib/api/ResponseError'
import {reportError} from '@/redux/modules/fabric'
import * as api from '@/lib/services/listings'
import * as actions from './index'
import {getOptions, getListingIds} from './selectors'

const pagination = (res, req) => ({
  remainingCount: res.remainingCount || 0,
  pageSize: req.pageSize || 10
})

function* buildParams(type, options = {}) {
  const result = {...options}
  result.excluded_listing_ids = yield select(getListingIds, {type})
  return result
}

function* request({key, count}) {
  yield put(actions.request(key))
  const options = yield select(getOptions, {type: key})
  const params = yield call(buildParams, key, options)
  params.page_size = count
  try {
    const response = yield call(api[key], params)
    yield put(
      actions.success(key, response.listings, pagination(response, options))
    )
  } catch (err) {
    yield put(actions.failure(key, err))
    if (!(err instanceof ResponseError)) yield put(reportError(err))
  }
}

export default function* listingsFeedSaga() {
  yield all([takeLatest(actions.LOAD_MORE, request)])
}
