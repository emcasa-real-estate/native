import {PureComponent} from 'react'
import {View, Text} from 'react-native'

export default class HelloScreen extends PureComponent {
  static screen = 'shared.HelloWorld'

  render() {
    return (
      <View>
        <Text>Hello world</Text>
      </View>
    )
  }
}
