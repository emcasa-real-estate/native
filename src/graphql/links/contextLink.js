import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

import {getToken} from '@/redux/modules/auth/selectors'

export default ({client}) =>
  ApolloLink.from([
    setContext(() => ({
      redux: {
        dispatch: client.store.dispatch,
        state: client.store.getState()
      }
    })),
    setContext((_, {headers, redux}) => {
      const jwt = getToken(redux.state)
      return {
        authenticated: Boolean(jwt),
        headers: {
          ...headers,
          Authorization: jwt ? `Token ${jwt}` : undefined
        }
      }
    })
  ])
