import _ from 'lodash'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {getUser} from '@/redux/modules/auth/selectors'
import ScreenRouter from '@/containers/ScreenRouter'
import Login from '@/screens/modules/auth/Login'

export default (Screen, {params, ...staticOptions}) =>
  Object.assign(
    compose(
      connect(
        (state, props) => {
          const user = getUser(state)
          return {
            Screen: user ? Screen : Login,
            params: _.isFunction(params)
              ? params(state, {user, ...props})
              : params || {},
            user
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
