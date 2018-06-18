import {Navigation} from 'react-native-navigation'
import {eventChannel} from 'redux-saga'
import {put, fork, call, all, take, takeEvery} from 'redux-saga/effects'

import * as actions from './index'

const emitter = Navigation.events()

const navigationEvent = (event) =>
  emitter[`register${event}Listener`].bind(emitter)

const createNavigationChannel = (event) =>
  eventChannel((emitter) => {
    const fun = navigationEvent(event)
    const subscription = fun((...args) => emitter({args}))
    return () => subscription.remove()
  })

const createNavigationDispatcher = (action) =>
  function* dispatchNavigationAction({args}) {
    yield put(action(...args))
  }

const createNavigationSaga = (fun, action) =>
  takeEvery(createNavigationChannel(fun), createNavigationDispatcher(action))

function* watchNavigationEvents() {
  yield all([
    createNavigationSaga('ComponentDidAppear', actions.screenAppeared),
    createNavigationSaga('ComponentDidDisappear', actions.screenDisappeared)
  ])
}

export default function* navigationSaga() {
  const channel = createNavigationChannel('AppLaunched')
  yield take(channel)
  yield call(channel.close)
  yield fork(watchNavigationEvents)
}
