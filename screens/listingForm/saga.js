import _ from 'lodash'
import {put, all, select, takeEvery} from 'redux-saga/effects'

import {getData as getListingData} from '@/redux/modules/listings/data/selectors'
import * as actions from './reducer'

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

export default function* listingFormScreenSaga() {
  yield all([takeEvery(actions.SET_LISTING, fetchListing)])
}
