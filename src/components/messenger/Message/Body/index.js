import {PureComponent} from 'react'
import {View} from 'react-native'
import {Svg, Rect, Polygon, G, Defs, Use} from 'react-native-svg'

import Text from '@/components/shared/Text'
import styles from './styles'

export default class MessageBody extends PureComponent {
  static defaultProps = {
    y: 46 / 2
  }

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

  get style() {
    return {
      strokeLinecap: 'round',
      strokeWidth: 1.5,
      stroke: 'black',
      fill: 'white'
    }
  }

  renderTip() {
    const {align, y} = this.props
    const {layout: {width}} = this.state
    const tipSize = 12
    const tipPoints = `${tipSize}, ${tipSize} ${tipSize},0 0, ${tipSize / 2}`
    return (
      <Polygon
        x={align === 'right' ? width - tipSize : 10}
        y={y - tipSize / 2}
        points={tipPoints}
        scaleX={align === 'right' ? -1 : 1}
      />
    )
  }

  renderBox() {
    const {align, y, showTip} = this.props
    const {layout: {width, height}} = this.state
    const style = this.style
    return (
      <Svg width={width} height={height}>
        <Defs>
          <G id="outline">
            <Rect
              x={align === 'right' ? style.strokeWidth : 20}
              y={style.strokeWidth}
              rx="5"
              ry="5"
              width={width - 20 - style.strokeWidth}
              height={height - style.strokeWidth * 2}
            />
            {showTip && this.renderTip()}
          </G>
        </Defs>
        <Use href="#outline" {...style} />
        <Use href="#outline" fill={style.fill} />
      </Svg>
    )
  }

  render() {
    const {children, align} = this.props
    const {layout} = this.state

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <View
          style={[
            styles.textContainer,
            {marginLeft: align === 'right' ? 0 : 20}
          ]}
        >
          <Text selectable style={styles.text}>
            {children}
          </Text>
        </View>
        {layout && <View style={styles.background}>{this.renderBox()}</View>}
      </View>
    )
  }
}
