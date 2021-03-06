import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {getContext} from '@/screens/modules/context/selectors'
import TextButton from '@/screens/modules/shared/Header/TextButton'

class AccountHeaderButton extends PureComponent {
  static screenName = 'account.HeaderButton'

  render() {
    const {loading, onPress} = this.props

    return <TextButton label="Salvar" loading={loading} onPress={onPress} />
  }
}

export default connect(
  (state) => getContext(state, {screen: 'account'}),
  null,
  null,
  {withRef: true}
)(AccountHeaderButton)
