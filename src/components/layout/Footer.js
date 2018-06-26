import {View, StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray.light
  }
})

export default function Footer({style, children}) {
  return <View style={[styles.container, style]}>{children}</View>
}
