import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import ScreenDelegator from './ScreenDelegator'

class ScreenRouter extends PureComponent {
  screenRef = React.createRef()

  getWrappedInstance() {
    return this.screenRef.current
  }

  updateOptions() {
    const {componentId, options, Screen} = this.props
    Navigation.mergeOptions(
      componentId,
      Object.assign({}, options, Screen.options)
    )
  }

  componentDidMount() {
    this.updateOptions()
  }

  componentDidUpdate(prev) {
    if (prev.Screen !== this.props.Screen) this.updateOptions()
  }

  render() {
    const {Screen, ...props} = this.props
    return <Screen ref={this.screenRef} {...props} />
  }
}

export default ScreenDelegator(ScreenRouter)
