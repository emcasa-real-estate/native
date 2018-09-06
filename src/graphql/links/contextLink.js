import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

import {GET_CREDENTIALS} from '@/graphql/modules/user/queries'

export default ({client}) =>
  ApolloLink.from([
    setContext(() => ({
      graphql: client.graphql,
      redux: {
        dispatch: client.store.dispatch,
        state: client.store.getState()
      }
    })),
    setContext(async (_, {headers, cache}) => {
      const {jwt} = await cache.readQuery({query: GET_CREDENTIALS})
      return {
        authenticated: Boolean(jwt),
        headers: {
          ...headers,
          Authorization: jwt ? `Token ${jwt}` : undefined
        }
      }
    })
  ])
