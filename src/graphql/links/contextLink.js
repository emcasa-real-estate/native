import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

import getCredentials from './stateLink/resolvers/queries/credentials'

export default ({client}) =>
  ApolloLink.from([
    setContext(() => ({
      graphql: client.graphql,
      redux: {
        dispatch: client.store.dispatch,
        state: client.store.getState()
      }
    })),
    setContext(async (_, {headers}) => {
      const {jwt} = await getCredentials()
      return {
        authenticated: Boolean(jwt),
        headers: {
          ...headers,
          Authorization: jwt ? `Token ${jwt}` : undefined
        }
      }
    })
  ])
