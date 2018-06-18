import {View, StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray.light
  }
})

export default function Footer({children}) {
  return <View style={styles.container}>{children}</View>
}
