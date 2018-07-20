import _ from 'lodash'
import {withClientState} from 'apollo-link-state'

import favorites from './resolvers/favorites'
import blacklist from './resolvers/blacklist'

export default ({cache}) =>
  withClientState({
    ..._.merge(favorites, blacklist),
    cache
  })
