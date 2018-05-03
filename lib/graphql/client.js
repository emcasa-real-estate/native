import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'

import createLinks, {sync} from './links'

const cache = new InMemoryCache()

const links = createLinks({cache})

const client = new ApolloClient({
  link: ApolloLink.from(Array.from(links.values())),
  cache
})

client._links = links

client.sync = () => sync(client)

client.onResetStore(links.get('state').writeDefaults)

export default client
