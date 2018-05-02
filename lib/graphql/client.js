import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'

import createLinks from './links'

const cache = new InMemoryCache()

const links = createLinks({cache})

const client = new ApolloClient({
  link: ApolloLink.from(Array.from(links.values())),
  cache
})

client.onResetStore(links.get('auth').state.writeDefaults)

export default client
