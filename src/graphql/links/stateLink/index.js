import {withClientState} from 'apollo-link-state'

import Mutation from './resolvers/mutations'
import Query from './resolvers/queries'

export default ({cache}) =>
  withClientState({
    cache,
    resolvers: {
      Mutation,
      Query
    }
  })
