import _ from 'lodash/fp'
import {
  put,
  all,
  call,
  race,
  select,
  fork,
  take,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import * as api from '@/lib/services/listings'
import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {GET_USER_LISTINGS} from '@/graphql/modules/user/queries'
import {patch as patchUserData} from '@/redux/modules/auth'
import {getUser, getToken} from '@/redux/modules/auth/selectors'
import {getData as getListingData} from '@/redux/modules/listings/data/selectors'
import * as listingData from '@/redux/modules/listings/data'
import * as actions from './reducer'
import {getValue, getListing} from './selectors'

const listingValue = _.flow(
  _.mapKeys(_.snakeCase),
  _.mapValues((value) => (value ? String(value) : undefined)),
  _.pick([
    'complement',
    'price',
    'type',
    'area',
    'floor',
    'rooms',
    'bathrooms',
    'garage_spots',
    'maintenance_fee',
    'property_tax',
    'description'
  ]),
  ({price, ...data}) => ({...data, price: price || undefined})
)

const addressText = ({city, state, street, street_number, neighborhood}) => {
  let text = `${street}, ${street_number} - `
  if (neighborhood) text += `${neighborhood}, `
  text += `${city} - ${state}`
  return text
}

const addressValue = _.flow(
  _.get('address'),
  _.mapKeys(_.snakeCase),
  (address) => ({
    details: address,
    text: {
      street: address.street,
      street_number: String(address.street_number),
      value: addressText(address)
    }
  })
)

const formValue = (listing) => ({
  ...listingValue(listing),
  address: addressValue(listing)
})

function* fetchListing({listing: {id}}) {
  let listing = yield select(getListingData, {id})
  if (_.isEmpty(listing)) {
    yield put(listingData.load(id))
    const {success} = yield race({
      success: take(listingData.SUCCESS),
      failure: take(listingData.FAILURE)
    })
    if (!success) return
    listing = success.data
  }
  yield put(actions.setValue(formValue(listing)))
}

function* updatePhone({phone}) {
  const {id, name} = yield select(getUser)
  const graphql = yield getContext('graphql')
  yield call(graphql.mutate, {
    mutation: EDIT_PROFILE,
    variables: {id, name, phone}
  })
  yield put(patchUserData({phone}))
}

function* createListing() {
  const {address, phone, ...listing} = yield select(getValue)
  const jwt = yield select(getToken)
  const graphql = yield getContext('graphql')
  yield put(actions.request())
  try {
    if (phone) yield fork(updatePhone, {phone})
    const response = yield call(
      api.create,
      {listing: {price: 0, ...listing}, address: address.details},
      {jwt}
    )
    yield call(graphql.query, {
      query: GET_USER_LISTINGS,
      fetchPolicy: 'network-only'
    })
    yield call(fetchListing, {listing: response.listing})
    yield put(actions.success(response.listing))
  } catch (error) {
    yield put(actions.failure(error))
  }
}

function* updateListing() {
  const {address, ...listing} = yield select(getValue)
  const {id} = yield select(getListing)
  const jwt = yield select(getToken)
  try {
    const response = yield call(
      api.update,
      id,
      {listing, address: address.details},
      {jwt}
    )
    yield put(listingData.patch(id, response.listing))
    yield put(actions.success({id}))
  } catch (error) {
    yield put(actions.failure(error))
  }
}

function* submit() {
  const listing = yield select(getListing)
  yield call(listing && listing.id ? updateListing : createListing)
}

export default function* listingFormScreenSaga() {
  yield all([
    takeLatest(actions.SET_LISTING, fetchListing),
    takeLatest(actions.SUBMIT, submit)
  ])
}
