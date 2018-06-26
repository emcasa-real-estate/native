import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import defaultOptions from '@/screens/options'
import client from '@/lib/client'
import ApolloProvider from './ApolloProvider'

export default class AppProvider extends PureComponent {
  render() {
    const {children} = this.props
    return (
      <Provider store={client.store}>
        <PersistGate persistor={client.store.persistor}>
          <ApolloProvider client={client.graphql}>{children}</ApolloProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export const withProvider = (Target) =>
  class extends PureComponent {
    static defaultProps = {params: {}}

    static displayName = `withProvider(${Target.displayName || Target.name})`

    screen = React.createRef()

    static options = _.defaultsDeep(Target.options || {}, defaultOptions)

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
