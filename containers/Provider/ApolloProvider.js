import {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'

import client from '@/lib/graphql/client'
import {getToken} from '@/redux/modules/auth/selectors'

class AppApolloProvider extends Component {
  componentDidMount() {
    if (!this.props.jwt) this.authQueue.close()
  }

  componentDidUpdate({jwt}) {
    if (jwt === this.props.jwt) return
    if (!this.props.jwt) this.authQueue.close()
    else this.authQueue.open()
  }

  get authQueue() {
    return client._links.get('auth').queue
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
