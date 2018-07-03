import {networkEventsListenerSaga} from 'react-native-offline'

import {fork, all} from 'redux-saga/effects'
import firebase from './firebase/saga'
import auth from './auth/saga'
import listings from './listings/saga'
import gallery from './gallery/saga'
import interest from './interest/saga'
import neighborhoods from './neighborhoods/saga'
import screens from '@/screens/modules/saga'

export default function* root() {
  yield all([
    fork(screens),
    fork(firebase),
    fork(auth),
    fork(listings),
    fork(gallery),
    fork(interest),
    fork(neighborhoods),
    fork(networkEventsListenerSaga, {
      timeout: 2000,
      checkConnectionInterval: 20000
    })
  ])
}
