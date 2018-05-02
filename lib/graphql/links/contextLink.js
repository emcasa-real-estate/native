import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

import {store} from '@/redux'
import {getToken} from '@/redux/modules/auth/selectors'

export default ApolloLink.from([
  setContext(() => ({
    redux: {
      dispatch: store.dispatch,
      state: store.getState()
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
