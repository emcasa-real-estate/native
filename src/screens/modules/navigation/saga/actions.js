import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import {delay} from 'redux-saga'
import {
  call,
  all,
  put,
  select,
  race,
  takeEvery,
  take,
  getContext
} from 'redux-saga/effects'

import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import getBottomTabs from '@/config/tabs'
import defaultOptions from '@/config/screen'
import * as actions from '../index'
import {getStackRootId} from '../selectors'
import {REHYDRATE} from 'redux-persist'

const authPersisted = (state) => state.auth._persist.rehydrated
const authPersistedAction = ({type, key}) =>
  type === REHYDRATE && key === 'auth'

function* initialize() {
  const ready = yield select(authPersisted)
  if (!ready)
    yield race({
      persist: take(authPersistedAction),
      timeout: delay(500)
    })
  Navigation.setDefaultOptions(defaultOptions)
  yield put(actions.updateStackRoot())
}

function* switchTab({tabIndex}) {
  const rootId = yield select(getStackRootId)
  Navigation.mergeOptions(rootId, {
    bottomTabs: {currentTabIndex: tabIndex}
  })
  yield put(actions.tabSelected(tabIndex))
}

function* updateStackRoot({rootId, tabIndex, children}) {
  const graphql = yield getContext('graphql')
  const {
    data: {userProfile}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore'
  })
  const bottomTabs = (yield select(getBottomTabs, {
    user: userProfile || {}
  })).map((component) => ({
    stack: {
      children: [{component}],
      options: component.options
    }
  }))
  if (children.length) bottomTabs[tabIndex].stack.children.push(...children)
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: rootId,
        options: {
          bottomTabs: {
            currentTabIndex: tabIndex,
            visible: false
          }
        },
        children: bottomTabs
      }
    }
  })
}

export default function* navigationActionsSaga() {
  yield all([
    takeEvery(actions.APP_LAUNCHED, initialize),
    takeEvery(actions.SWITCH_TAB, switchTab),
    takeEvery(actions.UPDATE_STACK_ROOT, updateStackRoot)
  ])
}
