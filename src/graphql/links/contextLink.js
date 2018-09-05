import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

import {GET_CREDENTIALS} from '@/graphql/modules/user/queries'

export default ({client}) =>
  ApolloLink.from([
    setContext(() => ({
      redux: {
        dispatch: client.store.dispatch,
        state: client.store.getState()
      }
    })),
    setContext(async (_, {headers, cache}) => {
      const {jwt} = await cache.readQuery({query: GET_CREDENTIALS})
      console.log('...', jwt)
      return {
        authenticated: Boolean(jwt),
        headers: {
          ...headers,
          Authorization: jwt ? `Token ${jwt}` : undefined
        }
      }
    })
  ])
