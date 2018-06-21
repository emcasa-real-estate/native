import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import {put, all, select, takeEvery} from 'redux-saga/effects'

import TABS, {STACK_ROOT} from '@/screens/tabs'
import * as actions from '../index'
import {getCurrentTab} from '../selectors'

function* setStackRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{component: {id: STACK_ROOT, name: TABS[STACK_ROOT].name}}]
      }
    }
  })
  yield put(actions.updateTab(STACK_ROOT))
}

function switchTab({tab}) {
  Navigation.setDefaultOptions({
    bottomTabs: {
      translucent: true,
      drawBehind: true,
      animate: false,
      visible: false
    }
  })
  Navigation.popTo(STACK_ROOT)
  if (tab !== STACK_ROOT)
    Navigation.push(STACK_ROOT, {
      component: {
        id: tab,
        name: TABS[tab].name
      }
    })
}

function* updateCurrentTab(action) {
  const tab = _.findKey(TABS, ({isActive}) => isActive(action))
  const currentTab = yield select(getCurrentTab)
  if (tab && tab !== currentTab) yield put(actions.updateTab(tab))
}

export default function* navigationActionsSaga() {
  yield all([
    takeEvery(actions.APP_LAUNCHED, setStackRoot),
    takeEvery(actions.SCREEN_APPEARED, updateCurrentTab),
    takeEvery(actions.SWITCH_TAB, switchTab)
  ])
}
