import {PureComponent} from 'react'
import {View} from 'react-native'
import {Svg, Rect, Polygon, G, Defs, Use} from 'react-native-svg'

import styles, {pathStyle} from './styles'

function MessageBox({align, y, showTip, width, height, ...props}) {
  const margin = 17
  const tipSize = 8
  const tipPoints = `${tipSize}, ${tipSize} ${tipSize},0 0, ${tipSize / 2}`
  return (
    <G>
      <Rect
        x={align === 'right' ? props.strokeWidth : margin}
        y={props.strokeWidth}
        rx="2"
        ry="2"
        width={width - margin - props.strokeWidth}
        height={height - props.strokeWidth * 2}
        {...props}
      />
      {showTip && (
        <Polygon
          x={align === 'right' ? width - tipSize - 2.5 : 10}
          y={y - tipSize / 2}
          points={tipPoints}
          scaleX={align === 'right' ? -1 : 1}
          {...props}
        />
      )}
    </G>
  )
}

MessageBox.defaultProps = {
  strokeWidth: 0
}

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

  renderBox() {
    const {align, y, showTip} = this.props
    const {layout} = this.state
    const style = pathStyle(this.props)
    return (
      <Svg {...layout}>
        <MessageBox
          {...style}
          {...layout}
          y={y}
          align={align}
          showTip={showTip}
        />
        <MessageBox
          {...style}
          {...layout}
          y={y}
          align={align}
          showTip={showTip}
          stroke="rgba(0,0,0,0)"
        />
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
