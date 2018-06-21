import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from '@/redux'
import ApolloProvider from './ApolloProvider'

export default class AppProvider extends PureComponent {
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

export const withProvider = (Target) =>
  class extends PureComponent {
    static displayName = `withProvider(${Target.displayName || Target.name})`

    child = React.createRef()

    static get options() {
      return Target.options
    }

    getWrappedInstance() {
      let instance = this.child.current
      while (instance && instance.getWrappedInstance)
        instance = instance.getWrappedInstance()
      return instance
    }

    resendEvent = (eventName, params) => {
      const instance = this.getWrappedInstance()
      if (instance && instance[eventName]) {
        instance[eventName](params)
      }
    }

    componentDidAppear() {
      this.resendEvent('componentDidAppear')
    }

    componentDidDisappear() {
      this.resendEvent('componentDidDisappear')
    }

    onNavigationButtonPressed(buttonId) {
      this.resendEvent('onNavigationButtonPressed', buttonId)
    }

    render() {
      return (
        <AppProvider>
          <Target ref={this.child} {...this.props} />
        </AppProvider>
      )
    }
  }
