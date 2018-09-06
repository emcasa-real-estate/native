import {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'

import {getToken} from '@/redux/modules/auth/selectors'

class AppApolloProvider extends Component {
  componentDidUpdate(prev) {
    const {client, jwt} = this.props
    if (prev.jwt === jwt) return
    if (jwt) client.sync()
    else client.resetStore()
  }

  render() {
    const {client, children} = this.props
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }
}

export default AppApolloProvider
