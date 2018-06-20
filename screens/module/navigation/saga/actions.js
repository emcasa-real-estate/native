import {Navigation} from 'react-native-navigation'
import {put, all, select, fork, take, takeEvery} from 'redux-saga/effects'

import {getActiveTabs, buildBottomTabs} from '@/screens/tabs'
import {getToken} from '@/redux/modules/auth/selectors'
import * as auth from '@/redux/modules/auth'
import * as actions from '../index'
import {getCurrentScreen} from '../selectors'

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
  Navigation.mergeOptions(screen.id, {
    bottomTabs: {
      currentTabId: tab
    }
  })
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
