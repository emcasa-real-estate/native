import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withPermission} from '@/containers/Permission'
import {watchPosition, unwatchPosition} from './module'
import {isWatchingPosition} from './module/selectors'
import * as colors from '@/assets/colors'
import Button from '@/screens/modules/shared/Header/TextButton'

class MapHeaderButton extends PureComponent {
  static screenName = 'listings.MapHeaderButton'

  onPress = async () => {
    if (this.props.watchingPosition) this.props.unwatchPosition()
    else if ((await this.props.onRequestPermission()) === 'authorized')
      this.props.watchPosition()
  }

  render() {
    const {watchingPosition} = this.props

    return (
      <Button
        label="Meu local"
        style={!watchingPosition && {color: colors.gray.medium}}
        onPress={this.onPress}
      />
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      watchingPosition: isWatchingPosition(state)
    }),
    {watchPosition, unwatchPosition}
  ),
  withPermission('location', 'whenInUse')
)(MapHeaderButton)
