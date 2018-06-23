import {put, all, race, take, takeEvery} from 'redux-saga/effects'

import * as listings from '@/redux/modules/listings/data'
import * as actions from './reducer'

function* fetchListing({id}) {
  yield put(listings.load(id))
  const [success] = yield race([take(listings.SUCCESS), take(listings.FAILURE)])
  if (success) yield put(actions.setValue(success.data))
}

export default function* listingFormScreenSaga() {
  yield all([takeEvery(actions.SET_LISTING, fetchListing)])
}
