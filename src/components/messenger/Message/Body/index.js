import {PureComponent} from 'react'
import {View} from 'react-native'
import {Svg, G, Rect} from 'react-native-svg'

import Text from '@/components/shared/Text'

export default class MessageBody extends PureComponent {
  state = {
    layout: undefined
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({
      layout: {
        width: layout.width,
        height: layout.height
      }
    })

  render() {
    const {children} = this.props
    const {layout} = this.state

    return (
      <Svg>
        <View onLayout={this.onLayout}>
          <Text>{children}</Text>
        </View>
        {layout && (
          <G>
            <Rect r="5" {...layout} />
          </G>
        )}
      </Svg>
    )
  }
}
