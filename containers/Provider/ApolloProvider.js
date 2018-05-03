import {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'

import {GET_FAVORITE_LISTINGS_IDS} from '@/lib/graphql/queries/favorites'
import client from '@/lib/graphql/client'
import {getToken} from '@/redux/modules/auth/selectors'

class AppApolloProvider extends Component {
  componentDidUpdate(prev) {
    const {jwt} = this.props
    if (prev.jwt === jwt) return
    if (jwt) this.state.sync(client)
    else client.resetStore()
  }

  get state() {
    return client._links.get('state')
  }

  render() {
    const {children} = this.props
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }
}

const props = (state) => ({
  jwt: getToken(state)
})

export default connect(props)(AppApolloProvider)
