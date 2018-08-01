import {PureComponent} from 'react'
import {View, KeyboardAvoidingView, Dimensions} from 'react-native'

export default class Shell extends PureComponent {
  state = {}

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({
      offset: Math.max(0, Dimensions.get('window').height - layout.height)
    })

  render() {
    const {style, children, testID} = this.props
    const {offset} = this.state
    return (
      <View testID={testID} style={{flex: 1}} onLayout={this.onLayout}>
        <KeyboardAvoidingView
          style={[{flex: 1, display: 'flex'}, style]}
          keyboardVerticalOffset={offset}
          behavior="padding"
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    )
  }
}
