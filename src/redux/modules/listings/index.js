import {combineReducers} from 'redux'

import data from './data'
import feed from './feed'
import relations from './relations'

export default combineReducers({data, feed, relations})
