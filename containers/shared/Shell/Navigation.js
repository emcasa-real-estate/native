import {PureComponent} from 'react'
import withNavigation from 'react-navigation/src/views/withNavigation'
import {connect} from 'react-redux'

import {getStack} from '@/lib/route'
import {getUser} from '@/redux/modules/auth/selectors'
import Navigation from '@/components/shared/Shell/Navigation'

@withNavigation
@connect((state) => ({
  user: getUser(state)
}))
export default class NavigationApp extends PureComponent {
  state = {
    activeRoute: null
  }

  componentDidMount() {
    const {navigation} = this.props
    const route = getStack(navigation)[0]
    this.setState({activeRoute: route.routeName})
  }

  onNavigate = (route) => () => this.props.navigation.navigate(route)

  render() {
    const {user} = this.props
    const {activeRoute} = this.state

    return (
      <Navigation
        active={activeRoute}
        user={user}
        onNavigate={this.onNavigate}
      />
    )
  }
}
