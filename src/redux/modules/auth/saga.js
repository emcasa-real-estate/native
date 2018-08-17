import {
  put,
  call,
  race,
  fork,
  take,
  takeLatest,
  all,
  getContext
} from 'redux-saga/effects'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import * as api from '@/lib/services/auth'
import * as actions from './index'

function* request(fun, params) {
  yield put(actions.request())
  try {
    const response = yield call(fun, params)
    yield put(actions.success(response))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

// Update user data in redux store after login/sign up
function* patchStoreAuth({user}) {
  if (!user) return
  const graphql = yield getContext('graphql')
  const {data} = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE
  })
  yield put(actions.patch(data.userProfile))
}

function* load(...args) {
  yield race({
    task: fork(request, ...args),
    cancel: take(actions.RESET)
  })
}

function* signIn({email, password}) {
  yield fork(load, api.signIn, {email, password})
}

function* signUp(params) {
  yield fork(load, api.signUp, params)
}

function* resetPassword({email}) {
  yield fork(load, api.resetPassword, {email})
}

export default function* authSaga() {
  yield all([
    takeLatest(actions.SIGN_IN, signIn),
    takeLatest(actions.SIGN_UP, signUp),
    takeLatest(actions.RESET_PASSWORD, resetPassword),
    takeLatest(actions.SUCCESS, patchStoreAuth)
  ])
}
