import {call, put, all, select, takeLatest} from 'redux-saga/effects'

import {getToken} from '../../auth/selectors'
import * as api from '@/lib/services/listingGallery'
import * as actions from './index'

function* request({id}) {
  yield put(actions.request(id))
  try {
    const jwt = yield select(getToken)
    const response = yield call(api.get, id, {jwt})
    yield put(actions.success(id, response.images))
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* remove({id, imageId}) {
  yield put(actions.request(id))
  try {
    const jwt = yield select(getToken)
    yield call(api.deleteImage, id, imageId, {jwt})
    yield call(request, {id})
  } catch (err) {
    yield put(actions.failure(id, err))
  }
}

function* changeOrder({id, order}) {
  yield put(actions.request(id))
  try {
    const jwt = yield select(getToken)
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
