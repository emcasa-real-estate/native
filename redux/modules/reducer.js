import {AsyncStorage} from 'react-native'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {reducer as network} from 'react-native-offline'

import auth from './auth'
import listings from './listings'
import gallery from './gallery'
import interest from './interest'
import neighborhoods from './neighborhoods'
import screens from '@/screens/module'

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
  screens,
  network,
  auth: persistent(auth, {whitelist: ['user']}),
  listings,
  gallery,
  interest,
  neighborhoods
})
