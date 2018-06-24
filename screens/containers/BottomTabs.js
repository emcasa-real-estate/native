import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {switchTab} from '@/screens/module/navigation'
import {getCurrentTab} from '@/screens/module/navigation/selectors'
import {getToken} from '@/redux/modules/auth/selectors'
import BottomTabs from '@/components/layout/Navigation'

@connect(
  (state) => ({
    currentTab: getCurrentTab(state),
    jwt: getToken(state)
  }),
  {switchTab}
)
export default class BottomTabsApp extends PureComponent {
  render() {
    const {jwt, currentTab, switchTab} = this.props
    return (
      <BottomTabs
        tabs={[
          {id: 'listings', icon: 'home', title: 'Imóveis'},
          {id: 'favorites', icon: 'heart', title: 'Favoritos'},
          jwt
            ? {id: 'account', icon: 'user', title: 'Perfil'}
            : {id: 'auth', icon: 'user', title: 'Login'}
        ]}
        currentTab={currentTab}
        onNavigate={(tab) => switchTab(tab)}
      />
    )
  }
}
