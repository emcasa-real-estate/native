import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {watchPosition, unwatchPosition} from './module'
import {isWatchingPosition} from './module/selectors'
import * as colors from '@/assets/colors'
import Button from '@/screens/modules/shared/Header/TextButton'

@connect(
  (state) => ({
    watchingPosition: isWatchingPosition(state)
  }),
  {watchPosition, unwatchPosition}
)
export default class MapHeaderButton extends PureComponent {
  static screenName = 'listings.MapHeaderButton'

  onPress = () =>
    this.props[
      this.props.watchingPosition ? 'unwatchPosition' : 'watchPosition'
    ].call()

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
