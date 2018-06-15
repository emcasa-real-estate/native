import {PureComponent} from 'react'
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'

const styles = StyleSheet.create({
  container: {
    marginRight: Platform.OS === 'android' ? 15 : 0
  },
  text: {
    color: colors.blue.medium,
    fontWeight: '500'
  }
})

export default class HeaderTextButton extends PureComponent {
  static screen = 'listings.Header.TextButton'

  renderButton() {
    const {label, style} = this.props

    return (
      <View style={styles.container}>
        <Text style={[styles.text, style]}>{label}</Text>
      </View>
    )
  }
  render() {
    const {onPress} = this.props

    if (!onPress) return this.renderButton()
    return (
      <TouchableOpacity onPress={onPress}>
        {this.renderButton()}
      </TouchableOpacity>
    )
  }
}
