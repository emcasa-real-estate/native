import {call, put, all, takeLatest, getContext} from 'redux-saga/effects'

import {GET_CREDENTIALS} from '@/graphql/modules/user/queries'
import * as api from '@/lib/services/listingGallery'
import * as actions from './index'

function* getJwt() {
  const graphql = yield getContext('graphql')
  const {credentials} = yield call([graphql, graphql.query], {
    query: GET_CREDENTIALS
  })
  return credentials.jwt
}

function* request({id}) {
  yield put(actions.request(id))
  try {
    const jwt = yield call(getJwt)
    const response = yield call(api.get, id, {jwt})
    yield put(actions.success(id, response.images))
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* remove({id, imageId}) {
  yield put(actions.request(id))
  try {
    const jwt = yield call(getJwt)
    yield call(api.deleteImage, id, imageId, {jwt})
    yield call(request, {id})
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* changeOrder({id, order}) {
  yield put(actions.request(id))
  try {
    const jwt = yield call(getJwt)
    yield call(api.changeOrder, id, order, {jwt})
    yield call(request, {id})
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

export default function* listingGallerySaga() {
  yield all([
    takeLatest(actions.LOAD, request),
    takeLatest(actions.REMOVE, remove),
    takeLatest(actions.CHANGE_ORDER, changeOrder)
  ])
}
