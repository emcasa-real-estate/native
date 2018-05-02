import {HttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'

import {API_URL} from '@/lib/config'
import contextLink from './contextLink'

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql_api`,
  credentials: 'same-origin'
})

/* eslint-disable no-console */
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.error(`[Network error]: ${networkError}`)
})
/* eslint-enable */

export default [errorLink, contextLink, httpLink]
