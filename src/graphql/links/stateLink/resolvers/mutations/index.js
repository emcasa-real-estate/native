import {merge} from 'lodash'

import * as blacklist from './blacklist'
import * as favorites from './favorites'

export default merge(blacklist, favorites)
