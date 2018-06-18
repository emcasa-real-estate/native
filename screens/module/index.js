import {combineReducers} from 'redux'

import context from './context'
import listings from '../listings/reducer'

export default combineReducers({
  context,
  listings
})
