import {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'

import createClient from '@/lib/graphql/client'
import {getToken} from '@/redux/modules/auth/selectors'

class AppApolloProvider extends Component {
  state = {
    client: null
  }

  constructor(props) {
    super(props)
    this.state.client = createClient({fetch: this.fetch})
  }

  fetch = async (uri, options) => {
    const {jwt} = this.props
    return window.fetch(uri, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: jwt ? `Token ${jwt}` : undefined
      }
    })
  }

  render() {
    const {children} = this.props
    const {client} = this.state
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }
}

const props = (state) => ({
  jwt: getToken(state)
})

export default connect(props)(AppApolloProvider)
