import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

export default class RedirectScreen extends PureComponent {
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
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabId: this.props.to
      }
    })
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
