import {PureComponent} from 'react'
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'

import {watchPosition, unwatchPosition} from './module'
import {isWatchingPosition} from './module/selectors'
import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'

const styles = StyleSheet.create({
  container: {
    marginRight: Platform.OS === 'android' ? 15 : 0
  },
  text: {
    color: colors.gray.medium,
    fontWeight: '500'
  },
  textActive: {
    color: colors.blue.medium
  }
})

@connect(
  (state) => ({
    watchingPosition: isWatchingPosition(state)
  }),
  {watchPosition, unwatchPosition}
)
export default class MapHeaderButton extends PureComponent {
  static screen = 'listings.MapHeaderButton'

  onPress = () =>
    this.props[
      this.props.watchingPosition ? 'watchPosition' : 'unwatchPosition'
    ].call()

  render() {
    const {watchingPosition} = this.props

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={[styles.text, watchingPosition && styles.textActive]}>
            Meu local
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
