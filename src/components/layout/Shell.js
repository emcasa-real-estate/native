import {PureComponent} from 'react'
import {View, KeyboardAvoidingView, Dimensions} from 'react-native'

export default class Shell extends PureComponent {
  static defaultProps = {
    avoidKeyboard: true
  }

  state = {}

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({
      offset: Math.max(0, Dimensions.get('window').height - layout.height)
    })

  render() {
    const {style, children, testID, avoidKeyboard} = this.props
    const {offset} = this.state
    const ViewComponent = avoidKeyboard ? KeyboardAvoidingView : View
    return (
      <View testID={testID} style={{flex: 1}} onLayout={this.onLayout}>
        <ViewComponent
          style={[{flex: 1}, style]}
          keyboardVerticalOffset={offset}
          behavior="padding"
        >
          <View style={{flex: 1, display: 'flex'}}>{children}</View>
        </ViewComponent>
      </View>
    )
  }
}
