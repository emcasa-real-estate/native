import _ from 'lodash'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {getToken} from '@/redux/modules/auth/selectors'
import ScreenRouter from '@/containers/ScreenRouter'
import Login from '@/screens/modules/auth/Login'

export default (Screen, {params, ...staticOptions}) =>
  Object.assign(
    compose(
      connect(
        (state) => {
          const loggedIn = getToken(state)
          return {
            Screen: loggedIn ? Screen : Login,
            params: _.isFunction(params) ? params(loggedIn) : params || {}
          }
        },
        null,
        null,
        {withRef: true}
      )
    )(ScreenRouter),
    staticOptions,
    {displayName: `authenticated(${Screen.displayName || Screen.name})`}
  )
