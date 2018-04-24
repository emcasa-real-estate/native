import {Component} from 'react'
import {TouchableWithoutFeedback, Dimensions} from 'react-native'

import DefaultCard from './Listing'

export default (Target) =>
  class extends Component {
    static displayName = `touchable(${Target.displayName || Target.name})`

    static defaultProps = {
      component: DefaultCard,
      get width() {
        return Dimensions.get('window').width
      }
    }

    state = {
      active: false
    }

    onHighlight = (active) => () => this.setState({active})

    render() {
      const {onPress, ...props} = this.props
      const {active} = this.state
      return (
        <TouchableWithoutFeedback
          onPress={onPress}
          onPressIn={this.onHighlight(true)}
          onPressOut={this.onHighlight(false)}
        >
          <Target active={active} {...props} />
        </TouchableWithoutFeedback>
      )
    }
  }
