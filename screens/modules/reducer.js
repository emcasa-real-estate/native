import {combineReducers} from 'redux'

import context from './context'
import navigation from './navigation'
import listings from './listings/reducer'
import listingForm from './listingForm/reducer'

export default combineReducers({
  context,
  navigation,
  listings,
  listingForm
})
