import {PureComponent} from 'react'
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'

import Text from '@/components/shared/Text'
import * as colors from '@/assets/colors'

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

export default class MapButton extends PureComponent {
  static screen = 'listings.MapButton'

  render() {
    const {active} = this.props

    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={[styles.text, active && styles.textActive]}>
            Meu local
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
