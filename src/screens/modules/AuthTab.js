import {connect} from 'react-redux'
import {compose} from 'recompose'

import {getToken} from '@/redux/modules/auth/selectors'
import ScreenRouter from '@/containers/ScreenRouter'
import Login from './auth/Login'
import Account from './account/Menu'

export default compose(
  connect((state) => {
    const loggedIn = getToken(state)
    return {
      Screen: loggedIn ? Account : Login,
      options: {
        bottomTab: {text: loggedIn ? 'Perfil' : 'Login'}
      }
    }
  })
)(
  class AuthTab extends ScreenRouter {
    static screenName = 'account'
  }
)
