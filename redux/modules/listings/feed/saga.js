import _ from 'lodash/fp'
import {
  put,
  call,
  all,
  race,
  fork,
  select,
  take,
  takeLatest
} from 'redux-saga/effects'

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

function* request({key, options}) {
  yield put(actions.request(key, options))
  const params = yield call(buildParams, key, options)
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

const filterParams = _.omit(['excluded_listing_ids', 'page_size'])

const eqlOptions = _.overArgs(_.isEqual)(Array(2).fill(filterParams))

function* load(action) {
  const options = yield select(getOptions, {type: action.key})
  // Reset results if params will change
  if (!eqlOptions(options, action.options)) yield put(actions.reset(action.key))
  yield race({
    task: fork(request, action),
    cancel: take(actions.RESET)
  })
}

export default function* listingsFeedSaga() {
  yield all([takeLatest(actions.LOAD, load)])
}
