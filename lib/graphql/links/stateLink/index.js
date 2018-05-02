import {withClientState} from 'apollo-link-state'

import favorites from './resolvers/favorites'

export default ({cache}) =>
  withClientState({
    ...favorites,
    cache
  })
