import {Navigation} from 'react-native-navigation'
import {all, takeEvery} from 'redux-saga/effects'

import {TABS} from '@/screens/modules/tabs'
import * as actions from '../index'

function switchTab({tab: name}) {
  const tab = TABS[name]
  Navigation.mergeOptions(tab.id, {
    bottomTabs: {
      currentTabId: tab.id
    }
  })
}

export default function* navigationActionsSaga() {
  yield all([takeEvery(actions.SWITCH_TAB, switchTab)])
}
