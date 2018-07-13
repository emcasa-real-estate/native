import {PureComponent} from 'react'
import {View} from 'react-native'
import {Svg, Rect, Polygon, G, Defs, Use} from 'react-native-svg'

import styles, {pathStyle} from './styles'

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

  renderTip() {
    const {align, y} = this.props
    const {layout: {width}} = this.state
    const tipSize = 8
    const tipPoints = `${tipSize}, ${tipSize} ${tipSize},0 0, ${tipSize / 2}`
    return (
      <Polygon
        x={align === 'right' ? width - tipSize - 2.5 : 10}
        y={y - tipSize / 2}
        points={tipPoints}
        scaleX={align === 'right' ? -1 : 1}
      />
    )
  }

  renderBox() {
    const {align, showTip} = this.props
    const {layout: {width, height}} = this.state
    const style = pathStyle(this.props)
    const margin = 17
    return (
      <Svg width={width} height={height}>
        <Defs>
          <G id="outline">
            <Rect
              x={align === 'right' ? style.strokeWidth : margin}
              y={style.strokeWidth}
              rx="2"
              ry="2"
              width={width - margin - style.strokeWidth}
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
            {[align == 'right' ? 'marginRight' : 'marginLeft']: 20}
          ]}
        >
          {children}
        </View>
        {layout && <View style={styles.background}>{this.renderBox()}</View>}
      </View>
    )
  }
}
