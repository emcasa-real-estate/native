import {connect} from 'react-redux'
import {compose} from 'recompose'

import {getToken} from '@/redux/modules/auth/selectors'
import ScreenRouter from '@/containers/ScreenRouter'
import Login from './auth/Login'
import Account from './account/Menu'

export default compose(
  connect((state) => ({Screen: getToken(state) ? Account : Login}))
)(
  class AuthTab extends ScreenRouter {
    static screenName = 'account'
  }
)
