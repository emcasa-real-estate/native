import {PureComponent} from 'react'
import {View, KeyboardAvoidingView, Dimensions} from 'react-native'

export default class Shell extends PureComponent {
  static defaultProps = {
    behavior: 'padding'
  }

  state = {}

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({
      offset: Math.max(0, Dimensions.get('window').height - layout.height),
      layout: {height: layout.height}
    })

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
