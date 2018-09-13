import {
  put,
  call,
  race,
  fork,
  all,
  select,
  take,
  takeLatest,
  getContext
} from 'redux-saga/effects'

import * as api from '@/lib/services/auth'
import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {getDeviceToken} from '@/redux/modules/firebase/messaging/selectors'
import * as messaging from '@/redux/modules/firebase/messaging'
import * as actions from './index'

function* updateToken() {
  const graphql = yield getContext('graphql')
  const deviceToken = yield select(getDeviceToken)
  const {
    data: {userProfile, credentials}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    errorPolicy: 'ignore'
  })
  if (!credentials.jwt || !userProfile || !deviceToken) return
  yield call([graphql, graphql.mutate], {
    mutation: EDIT_PROFILE,
    variables: {id: userProfile.id, deviceToken}
  })
}

function* request(fun, params) {
  yield put(actions.request())
  try {
    const response = yield call(fun, params)
    yield put(actions.success(response))
  } catch (err) {
    yield put(actions.failure(err))
  }
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
    takeLatest(actions.SUCCESS, updateToken),
    takeLatest(messaging.UPDATE_TOKEN, updateToken)
  ])
}
