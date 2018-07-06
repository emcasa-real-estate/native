import {combineReducers} from 'redux'

import messaging from './messaging'
import notifications from './notifications'

export default combineReducers({
  messaging,
  notifications
})
