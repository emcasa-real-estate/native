import {PureComponent} from 'react'
import {Animated} from 'react-native'
import {mapProps} from 'recompose'

const noop = () => null

export default class Animation extends PureComponent {
  static defaultProps = {
    onEnterStart: noop,
    onEnterEnd: noop,
    onLeaveStart: noop,
    onLeaveEnd: noop
  }

  static State = Object.freeze({
    ENTER: 'Enter',
    LEAVE: 'Leave'
  })

  static defaultProps = {
    update(value, state, {easing, timeout, useNativeDriver}) {
      return Animated.timing(value, {
        easing,
        duration: timeout,
        toValue: state ? 1 : 0,
        useNativeDriver
      })
    }
  }

  static getDerivedStateFromProps({initialValue, in: active}, state) {
    if (state.animationValue) return null
    let animationValue
    if (typeof initialValue === 'function') animationValue = initialValue()
    else if (!isNaN(initialValue))
      animationValue = new Animated.Value(initialValue)
    else animationValue = new Animated.Value(0)
    return {animationValue, animationState: active}
  }

  state = {
    animation: undefined,
    animationValue: undefined,
    animationState: false
  }

  update(animationState) {
    const toState = Animation.State[animationState ? 'ENTER' : 'LEAVE']
    let {animation, animationValue} = this.state
    if (animation) animation.stop()
    animation = this.props.update(animationValue, animationState, this.props)
    this.setState(
      {
        animationState,
        animation
      },
      () => {
        animation.start(() => this._run(`on${toState}End`))
        this._run(`on${toState}Start`)
      }
    )
  }

  _run = (event) => {
    const callback = this.props[event]
    if (callback) callback(this.props)
  }

  componentDidUpdate(prev) {
    if (this.props.in !== prev.in) this.update(this.props.in)
  }

  render() {
    return this.props.children(this.state)
  }
}

export const withAnimation = (options = {}) => (Target) => ({
  onEnterStart,
  onEnterEnd,
  onLeaveStart,
  onLeaveEnd,
  ...props
}) => (
  <Animation
    in={props.in}
    {...options}
    {...{
      onEnterStart,
      onEnterEnd,
      onLeaveStart,
      onLeaveEnd
    }}
  >
    {(state) => <Target {...props} {...state} />}
  </Animation>
)

export const animate = (getStyle) =>
  mapProps(({animationValue, ...props}) => ({
    style: getStyle(animationValue, props),
    ...props
  }))
