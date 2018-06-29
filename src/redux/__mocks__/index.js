/* eslint-env jest */
import configureStore from 'redux-mock-store'
import {persistStore} from 'redux-persist'

import reducer from '../modules/reducer'

const mockStore = configureStore([])

export function create(state = {}) {
  const store = mockStore(state)
  store.replaceReducer(reducer)
  store.persistor = persistStore(store)
  return store
}

export const store = create()
export const persistor = store.persistor
