import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import Map from './Map/module'
import Search from './Search/module'

const persistent = (reducer, options = {}) =>
  persistReducer(
    {
      key: reducer.name,
      storage: AsyncStorage,
      ...options
    },
    reducer
  )

export default combineReducers({
  Map: persistent(Map, {whitelist: ['watching', 'position']}),
  Search
})
