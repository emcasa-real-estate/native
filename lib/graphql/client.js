import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'

import links from './links'

const cache = new InMemoryCache()

export default new ApolloClient({
  link: ApolloLink.from(links({cache})),
  cache
})
