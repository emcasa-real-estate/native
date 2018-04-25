import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'

import {API_URL} from '@/lib/config'

export default ({fetch}) =>
  new ApolloClient({
    connectToDevTools: process.browser,
    link: new HttpLink({
      fetch,
      uri: `${API_URL}/graphql_api`, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache()
  })
