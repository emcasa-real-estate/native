import {onError} from 'apollo-link-error'

/* eslint-disable no-console */
export default () =>
  onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
/* eslint-enable */
