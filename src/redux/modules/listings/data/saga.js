import {call, put, all, select, takeLatest} from 'redux-saga/effects'

import {getToken} from '../../auth/selectors'
import {getImages} from '../../gallery/data/selectors'
import * as galleryData from '../../gallery/data'
import * as galleryUpload from '../../gallery/upload'
import * as api from '@/lib/services/listings'
import * as actions from './index'

function* request({id}) {
  yield put(actions.request(id))
  try {
    const jwt = yield select(getToken)
    const response = yield call(api.get, id, {jwt})
    yield put(actions.success(id, response.listing))
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* patchGallery({id}) {
  const images = yield select(getImages, {id})
  yield put(actions.patch(id, {images}))
}

export default function* listingsDataSaga() {
  yield all([
    takeLatest(actions.LOAD, request),
    takeLatest(galleryData.SUCCESS, patchGallery),
    takeLatest(galleryUpload.SUCCESS, patchGallery)
  ])
}
