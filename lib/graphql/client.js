import {AsyncStorage} from 'react-native'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {persistCache} from 'apollo-cache-persist'
import {ApolloLink} from 'apollo-link'

import createLinks, {sync} from './links'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: AsyncStorage
})

const links = createLinks({cache})

const client = new ApolloClient({
  link: ApolloLink.from(Array.from(links.values())),
  cache
})

client.sync = () => sync(client)

client.onResetStore(links.get('state').writeDefaults)

export default client
