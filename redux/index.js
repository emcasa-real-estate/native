import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore} from 'redux-persist'
import createSagaMiddleware, {END} from 'redux-saga'

import reducer from './modules/reducer'
import saga from './modules/saga'

export default function create() {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  if (__DEV__) {
    middleware.push(require('redux-logger').default)
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

// Create store outside entry point to avoid creating a new one on HMR
export const store = create()
export const persistor = store.persistor
