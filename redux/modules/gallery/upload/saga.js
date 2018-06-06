import {
  call,
  put,
  all,
  select,
  race,
  fork,
  take,
  takeLatest
} from 'redux-saga/effects'

import {getToken} from '../../auth/selectors'
import * as api from '@/lib/services/listingGallery'
import * as cdn from '@/lib/services/cloudinary'
import * as actions from './index'

function* request({id, image, position}) {
  try {
    const jwt = yield select(getToken)
    const {filename} = yield call(cdn.upload, image)
    // eslint-disable-next-line no-console
    if (__DEV__) console.info(`Uploaded gallery image ${filename}`)
    const response = yield call(api.create, id, {filename, position}, {jwt})
    yield put(actions.success(id, position, response.image))
  } catch (err) {
    yield put(actions.failure(id, position, err))
  }
}

function* create({id, images}) {
  yield put(actions.request(id, images.length))
  yield race({
    upload: all(images.map((params) => fork(request, {id, ...params}))),
    cancel: take(actions.CANCEL)
  })
}

export default function* listingGallerySaga() {
  yield all([takeLatest(actions.CREATE, create)])
}
