import React, {PureComponent} from 'react'
import {View, Keyboard, KeyboardAvoidingView} from 'react-native'

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
    const {style, children, testID, behavior} = this.props
    const {offset, layout, keyboardVisible} = this.state
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
          enabled={behavior !== 'none'}
        >
          <View style={{flex: 1, display: 'flex'}}>{children}</View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
