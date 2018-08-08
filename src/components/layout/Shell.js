import {PureComponent} from 'react'
import {View, KeyboardAvoidingView} from 'react-native'

export default class Shell extends PureComponent {
  static defaultProps = {
    behavior: 'padding'
  }

  state = {
    offset: 63
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({layout: {height: layout.height}})

  render() {
    const {style, children, testID, behavior} = this.props
    const {offset, layout} = this.state
    return (
      <View
        testID={testID}
        style={[{flex: 1}, layout]}
        onLayout={this.onLayout}
      >
        <KeyboardAvoidingView
          style={[{flex: 1}, style]}
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
