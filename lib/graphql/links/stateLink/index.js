import {withClientState} from 'apollo-link-state'
import {InMemoryCache} from 'apollo-cache-inmemory'

import favorites from './resolvers/favorites'

const cache = new InMemoryCache()

export default withClientState({
  ...favorites,
  cache
})
