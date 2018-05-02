import {ApolloLink} from 'apollo-link'
import {withClientState} from 'apollo-link-state'

import favorites from './resolvers/favorites'
import Queue from './Queue'

const queueableOperations = ['favoriteListing', 'unfavoriteListing']

const shouldQueue = (op) =>
  !op.getContext().authenticated &&
  queueableOperations.findIndex((name) => op.operationName === name) !== -1

export default ({cache}) => {
  const queue = new Queue()
  const stateLink = withClientState({
    ...favorites,
    cache
  })
  const link = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      if (operation.getContext().queue !== queue && shouldQueue(operation))
        queue.enqueue(operation)
      return forward(operation)
    }),
    stateLink
  ])
  link.state = stateLink
  link.queue = queue
  return link
}
