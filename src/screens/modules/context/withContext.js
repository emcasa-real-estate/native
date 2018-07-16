import _ from 'lodash/fp'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {getContext} from './selectors'
import {setContext, clearContext} from './index'

export default function withContext(_key) {
  const getKey = _.isFunction(_key) ? _key : () => _key
  return connect(
    (state, props) => getContext(state, {key: getKey(props)}),
    (dispatch, props) =>
      bindActionCreators(
        {
          setContext: setContext(getKey(props)),
          clearContext: clearContext(getKey(props))
        },
        dispatch
      )
  )
}

withContext.byProp = (pathToProp) => withContext(_.get(pathToProp))
