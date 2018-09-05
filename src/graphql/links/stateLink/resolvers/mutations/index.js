import {merge} from 'lodash'

import * as blacklist from './blacklist'
import * as favorites from './favorites'
import * as credentials from './credentials'

export default merge(blacklist, favorites, credentials)
