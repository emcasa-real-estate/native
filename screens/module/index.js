import {combineReducers} from 'redux'

import context from './context'
import navigation from './navigation'
import listings from '../listings/reducer'

export default combineReducers({
  context,
  navigation,
  listings
})
