import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import {put, all, select, takeEvery} from 'redux-saga/effects'

import bottomTabs, {TABS} from '@/screens/tabs'
import defaultOptions from '@/screens/options'
import * as auth from '@/redux/modules/auth'
import * as actions from '../index'

function setRoot() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: bottomTabs.map((component) => ({component}))
      }
    }
  })
}

export default function* navigationActionsSaga() {
  yield all([takeEvery(actions.APP_LAUNCHED, setRoot)])
}
