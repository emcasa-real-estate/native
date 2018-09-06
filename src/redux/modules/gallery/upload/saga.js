import {
  call,
  put,
  all,
  race,
  fork,
  take,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import {GET_CREDENTIALS} from '@/graphql/modules/user/queries'
import * as api from '@/lib/services/listingGallery'
import * as cdn from '@/lib/services/cloudinary'
import * as actions from './index'

function* request({id, image, position}) {
  try {
    const graphql = yield getContext('graphql')
    const {
      credentials: {jwt}
    } = yield call([graphql, graphql.query], {
      query: GET_CREDENTIALS
    })
    const {filename} = yield call(cdn.upload, image)
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
