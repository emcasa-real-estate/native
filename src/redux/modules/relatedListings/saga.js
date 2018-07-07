import {
  call,
  put,
  all,
  select,
  fork,
  takeEvery,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import * as frag from '@/graphql/fragments'
import * as api from '@/lib/services/listings'
import {getToken} from '../auth/selectors'
import * as actions from './index'

function* request({id}) {
  yield put(actions.request(id))
  try {
    const jwt = select(getToken)
    const response = yield call(api.related, id, {jwt})
    yield put(actions.success(id, response.listings))
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* patchListing({listing}) {
  const graphql = yield getContext('graphql')
  yield call([graphql, graphql.writeFragment], {
    id: `Listing:${listing.id}`,
    fragment: frag.ListingFeed,
    fragmentName: 'ListingFeed',
    data: frag.Listing.parse(listing)
  })
}

function* patchGraphqlStore({data}) {
  yield all(data.map((listing) => fork(patchListing, {listing})))
}

export default function* listingsDataSaga() {
  yield all([
    takeLatest(actions.LOAD, request),
    takeEvery(actions.SUCCESS, patchGraphqlStore)
  ])
}
