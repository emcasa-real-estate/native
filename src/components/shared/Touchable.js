import {PureComponent} from 'react'
import {TouchableWithoutFeedback} from 'react-native'

export default class Touchable extends PureComponent {
  state = {
    active: false
  }

  onHighlight = (active) => () => this.setState({active})

  render() {
    const {onPress, children} = this.props
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.onHighlight(true)}
        onPressOut={this.onHighlight(false)}
      >
        {children(this.state)}
      </TouchableWithoutFeedback>
    )
  }
}

export const touchable = (Target) => ({onPress, ...props}) => (
  <Touchable onPress={onPress}>
    {(ctx) => <Target {...ctx} {...props} />}
  </Touchable>
)
