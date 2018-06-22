import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import {put, all, select, takeEvery} from 'redux-saga/effects'

import TABS, {STACK_ROOT} from '@/screens/tabs'
import * as actions from '../index'
import {getCurrentTab, getStackRoot} from '../selectors'

const uniqId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

function* setStack({stack}) {
  stack.unshift({id: `${STACK_ROOT}_${uniqId()}`, name: TABS[STACK_ROOT].name})
  Navigation.setRoot({
    root: {
      stack: {
        children: stack.map((component) => ({component}))
      }
    }
  })
  yield put(actions.updateTab(STACK_ROOT))
  yield put(actions.updateStackRoot(stack[0]))
}

function* setInitialStack() {
  yield put(actions.setStack([]))
}

function* switchTab({tab}) {
  const currentTab = yield select(getCurrentTab)
  const stackRoot = yield select(getStackRoot)
  if (tab === currentTab) return
  yield put(actions.updateTab(tab))
  Navigation.setDefaultOptions({
    bottomTabs: {
      translucent: true,
      drawBehind: true,
      animate: false,
      visible: false
    }
  })
  Navigation.popTo(stackRoot.id)
  if (tab !== STACK_ROOT) {
    Navigation.push(stackRoot.id, {
      component: {
        id: tab,
        name: TABS[tab].name
      }
    })
  }
}

function* updateCurrentTab(action) {
  const tab = _.findKey(TABS, ({isActive}) => isActive(action))
  const currentTab = yield select(getCurrentTab)
  if (tab && tab !== currentTab) yield put(actions.updateTab(tab))
}

export default function* navigationActionsSaga() {
  yield all([
    takeEvery(actions.SWITCH_TAB, switchTab),
    takeEvery(actions.SET_STACK, setStack),
    takeEvery(actions.SCREEN_APPEARED, updateCurrentTab),
    takeEvery(actions.APP_LAUNCHED, setInitialStack)
  ])
}
