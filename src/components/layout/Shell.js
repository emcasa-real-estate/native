import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {View, Keyboard, KeyboardAvoidingView, Platform} from 'react-native'

import BottomTabs from './BottomTabs'

const AbsoluteBottomTabs = styled(BottomTabs)`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
`

export default class Shell extends PureComponent {
  static defaultProps = {
    behavior: 'padding'
  }

  state = {
    keyboardVisible: false,
    offset: 63
  }

  keyboardAvoidingView = React.createRef()

  componentDidMount() {
    this.keyboardListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardHide
    )
  }

  componentWillUnmount() {
    this.keyboardListener.remove()
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({layout: {height: layout.height}})
  // Reset KeyboardAvoidingView padding when keyboard is hidden
  onKeyboardHide = () => {
    this.keyboardAvoidingView.current._onKeyboardChange()
  }

  render() {
    const {style, children, testID, behavior, bottomTabs} = this.props
    const {offset, layout, keyboardVisible} = this.state
    const bottomTabProps = typeof bottomTabs === 'object' ? bottomTabs : {}
    const layoutInfo = {
      hasBottomTabs: Boolean(bottomTabs)
    }
    return (
      <View
        testID={testID}
        style={[{flex: 1}, layout]}
        onLayout={this.onLayout}
      >
        <KeyboardAvoidingView
          ref={this.keyboardAvoidingView}
          style={[{flex: 1}, style, !keyboardVisible && layout]}
          keyboardVerticalOffset={offset}
          behavior={behavior !== 'none' ? behavior : undefined}
          enabled={Platform.OS !== 'android' && behavior !== 'none'}
        >
          <View style={{flex: 1, display: 'flex'}}>
            {React.Children.map(children, (node) =>
              React.cloneElement(node, layoutInfo)
            )}
          </View>
        </KeyboardAvoidingView>
        {layoutInfo.hasBottomTabs && (
          <AbsoluteBottomTabs testID="bottom_tabs" {...bottomTabProps} />
        )}
      </View>
    )
  }
}
