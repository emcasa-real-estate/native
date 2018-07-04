import {PureComponent} from 'react'
import {Animated, Easing} from 'react-native'

export default class SlideView extends PureComponent {
  static defaultProps = {
    height: 100,
    duration: 500,
    easing: Easing.cubic
  }

  state = {
    layout: {},
    hidden: false,
    position: new Animated.Value(0)
  }

  constructor(props) {
    super(props)
    this.state.hidden = !props.in
    this.state.layout.height = props.height
    if (!props.in) this.state.position.setValue(props.height)
  }

  get style() {
    const {from} = this.props
    const {hidden, position} = this.state
    const delta = from === 'top' ? -1 : 1
    return {
      transform: [{translateY: Animated.multiply(position, delta)}],
      display: hidden ? 'none' : 'flex'
    }
  }

  hide() {
    const {duration, easing} = this.props
    const {layout: {height}} = this.state
    Animated.timing(this.state.position, {
      toValue: height,
      duration,
      easing,
      useNativeDriver: true
    }).start(() => this.setState({hidden: true}))
  }

  show() {
    const {duration, easing} = this.props
    this.setState({hidden: false}, () =>
      Animated.timing(this.state.position, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver: true
      }).start()
    )
  }

  updateAnimation() {
    this.state.position.stopAnimation(() => {
      if (this.props.in) this.show()
      else this.hide()
    })
  }

  updateValue() {
    const {position, layout: {height}} = this.state
    if (this.props.in) position.setValue(0)
    else position.setValue(height)
  }

  componentDidUpdate(props, state) {
    if (this.props.in !== props.in) this.updateAnimation()
    if (this.state.layout && !state.layout) this.updateValue()
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  render() {
    const {style, children} = this.props
    return (
      <Animated.View style={[style, this.style]} onLayout={this.onLayout}>
        {children}
      </Animated.View>
    )
  }
}
