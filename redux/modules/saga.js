import {networkEventsListenerSaga} from 'react-native-offline'

import {fork, all} from 'redux-saga/effects'
import fabric from './fabric/saga'
import auth from './auth/saga'
import listings from './listings/saga'
import interest from './interest/saga'
import neighborhoods from './neighborhoods/saga'

export default function* root() {
  yield all([
    fork(fabric),
    fork(auth),
    fork(listings),
    fork(interest),
    fork(neighborhoods),
    fork(networkEventsListenerSaga, {
      timeout: 2000,
      checkConnectionInterval: 20000
    })
  ])
}
