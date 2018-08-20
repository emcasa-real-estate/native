import {Navigation} from 'react-native-navigation'
import {all, select, takeEvery} from 'redux-saga/effects'

import getBottomTabs from '@/screens/tabs'
import defaultOptions from '@/screens/options'
import * as auth from '@/redux/modules/auth'
import * as actions from '../index'

function* setRoot() {
  const bottomTabs = yield select(getBottomTabs)
  Navigation.setDefaultOptions(defaultOptions)
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: bottomTabs.map((component) => ({
          stack: {children: [{component}]}
        }))
      }
    }
  })
}

export default function* navigationActionsSaga() {
  yield all([
    // Update stack root when auth state changes
    takeEvery(auth.SUCCESS, setRoot),
    takeEvery(auth.SIGN_OUT, setRoot),
    takeEvery(actions.APP_LAUNCHED, setRoot)
  ])
}
