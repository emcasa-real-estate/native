import {AsyncStorage} from 'react-native'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {persistCache} from 'apollo-cache-persist'
import {ApolloLink} from 'apollo-link'

import createLinks, {sync} from './links'

export default function createApolloClient(client) {
  const cache = new InMemoryCache()

  persistCache({
    cache,
    storage: AsyncStorage
  })

  const links = createLinks({cache, client})

  const apolloClient = new ApolloClient({
    link: ApolloLink.from(Array.from(links.values())),
    cache
  })

  apolloClient.sync = () => sync(apolloClient)

  apolloClient.onResetStore(links.get('state').writeDefaults)

  return apolloClient
}
