import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import {put, all, select, fork, take, takeEvery} from 'redux-saga/effects'

import {getActiveTabs, buildBottomTabs} from '@/screens/tabs'
import {getToken} from '@/redux/modules/auth/selectors'
import * as auth from '@/redux/modules/auth'
import * as actions from '../index'
import {
  getCurrentScreen,
  getCurrentTab,
  getNavigationStackById
} from '../selectors'

function setStackRoot({tabs}) {
  Navigation.setDefaultOptions({
    bottomTabs: {
      translucent: true,
      drawBehind: true,
      animate: false,
      visible: false
    }
  })
  Navigation.setRoot({
    root: {
      bottomTabs: buildBottomTabs(tabs)
    }
  })
}

function* updateTabs() {
  const jwt = yield select(getToken)
  yield put(actions.updateStack(getActiveTabs({jwt})))
}

function* switchTab({tab}) {
  const screen = yield select(getCurrentScreen)
  const currentTab = yield select(getCurrentTab)
  if (currentTab !== tab)
    Navigation.mergeOptions(screen.id, {
      bottomTabs: {
        currentTabId: tab
      }
    })
  else {
    const tabOptions = yield select(getNavigationStackById, {id: tab})
    Navigation.popTo(_.last(tabOptions.stack).id)
  }
  yield put(actions.updateTab(tab))
}

export default function* navigationActionsSaga() {
  yield take(actions.APP_LAUNCHED)
  yield all([
    fork(updateTabs),
    takeEvery(actions.SWITCH_TAB, switchTab),
    takeEvery(actions.UPDATE_STACK, setStackRoot),
    takeEvery(auth.SUCCESS, updateTabs)
  ])
}
