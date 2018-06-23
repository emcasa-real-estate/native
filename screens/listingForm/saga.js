import _ from 'lodash'
import {
  put,
  all,
  call,
  select,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import * as api from '@/lib/services/listings'
import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {GET_USER_LISTINGS} from '@/graphql/modules/user/queries'
import {getData as getListingData} from '@/redux/modules/listings/data/selectors'
import {getToken} from '@/redux/modules/auth/selectors'
import * as actions from './reducer'
import {getValue} from './selectors'

const listingValue = ({address, ...listing}) => ({
  ..._.mapValues(listing, (value) => (value ? String(value) : undefined)),
  address: {
    details: address,
    text: {
      street: address.street,
      street_number: String(address.streetNumber),
      value: `${address.street}, ${address.streetNumber} - ${address.city} - ${
        address.state
      }`
    }
  }
})

function* fetchListing({listing: {id}}) {
  let listing = yield select(getListingData, {id})

  yield put(actions.setValue(listingValue(listing)))
}

function* submit() {
  const {address, phone, ...listing} = yield select(getValue)
  const jwt = yield select(getToken)
  const graphql = yield getContext('graphql')
  yield put(actions.request())
  try {
    if (phone)
      yield call(graphql.mutate, {
        mutation: EDIT_PROFILE,
        variables: {phone}
      })
    const response = yield call(
      api.create,
      {listing, address: address.details},
      {jwt}
    )
    yield call(graphql.query, {
      query: GET_USER_LISTINGS,
      fetchPolicy: 'network-only'
    })
    yield put(actions.success(response.listing))
  } catch (error) {
    yield put(actions.failure(error))
  }
}

export default function* listingFormScreenSaga() {
  yield all([
    takeLatest(actions.SET_LISTING, fetchListing),
    takeLatest(actions.SUBMIT, submit)
  ])
}
