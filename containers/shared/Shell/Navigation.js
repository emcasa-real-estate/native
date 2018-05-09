import withNavigation from 'react-navigation/src/views/withNavigation'
import {connect} from 'react-redux'

import {getUser} from '@/redux/modules/auth/selectors'
import Navigation from '@/components/shared/Shell/Navigation'

const props = (state) => ({
  user: getUser(state)
})

export default withNavigation(connect(props)(Navigation))
