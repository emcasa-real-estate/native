import {eventChannel} from 'redux-saga'
import {
  all,
  call,
  put,
  select,
  fork,
  take,
  takeLatest,
  getContext
} from 'redux-saga/effects'
import Firebase from 'react-native-firebase'

import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {getUser} from '@/redux/modules/auth/selectors'
import * as actions from './index'
import {getToken, hasPermission} from './selectors'

const messaging = Firebase.messaging()

const tokenRefreshChannel = () =>
  eventChannel((emit) => messaging.onTokenRefresh((token) => emit({token})))

function* updateToken({token}) {
  const graphql = yield getContext('graphql')
  const user = yield select(getUser)
  if (!user) return
  yield call([graphql, graphql.mutate], {
    mutation: EDIT_PROFILE,
    variables: {id: user.id, deviceToken: token}
  })
}

function* requestPermission() {
  try {
    yield call(() => messaging.requestPermission())
    yield put(actions.updatePermission(true))
  } catch (err) {
    yield put(actions.updatePermission(false))
  }
}

function* initializeToken() {
  let token = yield call(() => messaging.getToken())
  let oldToken = yield select(getToken)
  const channel = tokenRefreshChannel()
  do {
    if (token == oldToken) continue
    yield put(actions.updateToken(token))
    oldToken = token
  } while ((token = yield take(channel)))
}

function* initializePermission() {
  const enabled = yield call(() => messaging.hasPermission())
  const currentPermission = yield select(hasPermission)
  // Request permission if it's currently denied and the user's response hasn't been cached yet
  if (
    !enabled &&
    typeof currentPermission === 'undefined' &&
    process.env.NODE_ENV !== 'e2e'
  )
    yield put(actions.requestPermission())
  else yield put(actions.updatePermission(enabled))
}

export default function* fcmSaga() {
  yield all([
    takeLatest(actions.REQUEST_PERMISSION, requestPermission),
    takeLatest(actions.UPDATE_TOKEN, updateToken),
    fork(initializePermission),
    fork(initializeToken)
  ])
}
