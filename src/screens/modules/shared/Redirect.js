import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {switchTab} from '@/screens/modules/navigation'

class RedirectScreen extends PureComponent {
  static screenName = 'shared.Redirect'

  static createStack(component, options, passProps = {}) {
    return [
      {
        id: `${component.id}_back`,
        name: this.screenName,
        options: _.omit(options, 'topBar'),
        passProps: {
          ...passProps,
          parent: component
        }
      },
      component
    ]
  }

  componentDidMount() {
    const {title} = this.props
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {title: {text: title}}
    })
  }

  componentDidAppear() {
    this.props.switchTab(this.props.to)
  }

  componentDidDisappear() {
    Navigation.push(this.props.componentId, {
      component: this.props.parent
    })
  }

  render() {
    return null
  }
}

export default connect(null, {switchTab}, null, {withRef: true})(RedirectScreen)
