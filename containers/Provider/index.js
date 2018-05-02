import {Component} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from '@/redux'
import ApolloProvider from './ApolloProvider'

export default class AppProvider extends Component {
  render() {
    const {children} = this.props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider>{children}</ApolloProvider>
        </PersistGate>
      </Provider>
    )
  }
}
