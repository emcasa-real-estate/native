import {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'

import client from '@/lib/graphql/client'
import {getToken} from '@/redux/modules/auth/selectors'

class AppApolloProvider extends Component {
  componentDidUpdate(prev) {
    const {jwt} = this.props
    if (prev.jwt === jwt) return
    if (jwt) client.sync()
    else client.resetStore()
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
