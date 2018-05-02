import {Component} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ApolloProvider} from 'react-apollo'

import {store, persistor} from '@/redux'
import client from '@/lib/graphql/client'

export default class AppProvider extends Component {
  render() {
    const {children} = this.props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </PersistGate>
      </Provider>
    )
  }
}
