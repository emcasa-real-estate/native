import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import ScreenDelegator from './ScreenDelegator'

class ScreenRouter extends PureComponent {
  screenRef = React.createRef()

  state = {}

  constructor(props) {
    super(props)
    this.state.Screen = props.Screen
  }

  getWrappedInstance() {
    return this.screenRef.current
  }

  updateOptions() {
    const {componentId} = this.props
    const {Screen, options} = this.state
    Navigation.mergeOptions(
      componentId,
      Object.assign({}, options, Screen.options)
    )
  }

  componentDidMount() {
    this.updateOptions()
  }

  componentDidUpdate(prev) {
    const {Screen, options} = this.props
    if (prev.Screen !== Screen) {
      // Skip one cycle to update the screen
      this.setState({Screen, options}, () => this.updateOptions())
    }
  }

  render() {
    const {...props} = this.props
    const {Screen} = this.state
    delete props.Screen
    return <Screen ref={this.screenRef} {...props} />
  }
}

export default ScreenDelegator(ScreenRouter)
