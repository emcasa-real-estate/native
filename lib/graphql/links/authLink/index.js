import QueueLink from 'apollo-link-queue'

import stateLink from './stateLink'

const authQueue = new QueueLink()

const queueableOperations = ['favoriteListing', 'unfavoriteListing']

const shouldQueue = ({operationName}) =>
  queueableOperations.findIndex((name) => operationName === name) !== -1

export default (options) => {
  const link = stateLink(options).split(
    (operation, {authenticated}) => !authenticated && shouldQueue(operation),
    authQueue
  )
  link.queue = authQueue
  link.state = stateLink
  return link
}
