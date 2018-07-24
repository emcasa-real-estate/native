import contextLink from './contextLink'
import stateLink from './stateLink'
import errorLink from './errorLink'
import httpLink from './httpLink'
import queryResolverLink from './queryResolverLink'

export default (options) => {
  const links = new Map()
  if (__DEV__) links.set('logger', require('apollo-link-logger').default)
  links.set('error', errorLink(options))
  links.set('context', contextLink(options))
  links.set('state', stateLink(options))
  links.set('queryResolver', queryResolverLink(options))
  links.set('http', httpLink(options))
  return links
}

export {default as sync} from './stateLink/resolvers/favorites/sync'
