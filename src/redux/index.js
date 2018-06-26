import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore} from 'redux-persist'
import {offlineActionTypes} from 'react-native-offline'
import createSagaMiddleware, {END} from 'redux-saga'

import reducer from './modules/reducer'
import saga from './modules/saga'

export default function createReduxStore(client) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      get graphql() {
        return client.graphql
      }
    }
  })
  const middleware = [sagaMiddleware]
  if (__DEV__) {
    const {createLogger} = require('redux-logger')
    const ignoreActions = Object.values(offlineActionTypes)
    middleware.push(
      createLogger({
        predicate: (getState, action) =>
          ignoreActions.findIndex((type) => action.type === type) === -1,
        collapsed: true
      })
    )
  }
  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore)
  const store = finalCreateStore(reducer)
  store.persistor = persistStore(store)
  store.runSaga = (_) => {
    store.task = sagaMiddleware.run(_)
  }
  store.close = () => store.dispatch(END)
  store.runSaga(saga)
  if (module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(require('./modules/reducer').default)
    )
    module.hot.accept('./modules/saga', () => {
      store.task.cancel()
      store.runSaga(require('./modules/saga').default)
    })
    module.hot.accept(() => {})
  }
  return store
}
