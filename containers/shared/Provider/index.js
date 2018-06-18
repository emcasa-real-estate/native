import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import EventEmitter from 'events'

import {store, persistor} from '@/redux'
import ApolloProvider from './ApolloProvider'

export default class AppProvider extends PureComponent {
  static events = new EventEmitter()

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
      // Hack to get react-redux/react-apollo wrapped component instance
      while (instance && instance.getWrappedInstance)
        try {
          instance = instance.getWrappedInstance()
        } catch (_) {
          return instance
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
          <Target
            ref={this.child}
            eventEmitter={AppProvider.events}
            {...this.props}
          />
        </AppProvider>
      )
    }
  }
