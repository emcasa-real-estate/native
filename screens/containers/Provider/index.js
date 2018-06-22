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

    screen = React.createRef()

    static get options() {
      return Target.options
    }

    getWrappedInstance() {
      let instance = this.screen.current
      try {
        while (instance && instance.getWrappedInstance)
          instance = instance.getWrappedInstance()
      } catch (error) {
        throw new Error(
          `Unable to access ref for screen ${Target.screenName}.\n${
            error.message
          }`,
          error
        )
      }
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
          <Target ref={this.screen} {...this.props} />
        </AppProvider>
      )
    }
  }
