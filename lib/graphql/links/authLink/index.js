import QueueLink from 'apollo-link-queue'
import {withClientState} from 'apollo-link-state'

import favorites from './resolvers/favorites'

const queueLink = new QueueLink()

const stateLink = ({cache}) =>
  withClientState({
    ...favorites,
    cache
  })

const queueableOperations = ['favoriteListing', 'unfavoriteListing']

const shouldQueue = ({operationName}) =>
  queueableOperations.findIndex((name) => operationName === name) !== -1

export default (options) => {
  const link = stateLink(options).split(
    (operation, {authenticated}) => !authenticated && shouldQueue(operation),
    queueLink
  )
  link.queue = queueLink
  link.state = stateLink
  return link
}
