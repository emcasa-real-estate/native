import {
  call,
  put,
  all,
  fork,
  takeEvery,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import * as frag from '@/graphql/fragments'
import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import * as api from '@/lib/services/listings'
import * as actions from './index'

function* request({id, limit}) {
  yield put(actions.request(id))
  try {
    const graphql = yield getContext('graphql')
    const {
      userProfile: {blacklists}
    } = graphql.cache.readQuery({
      query: GET_BLACKLISTED_LISTINGS_IDS,
      fetchPolicy: 'cache-only'
    })
    const blacklistedIds = blacklists.map(({id}) => id)
    const response = yield call(api.related, id, {page_size: limit})
    yield put(
      actions.success(
        id,
        response.listings.filter(
          (listing) => !blacklistedIds.includes(String(listing.id))
        )
      )
    )
  } catch (err) {
    console.log(err)
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
