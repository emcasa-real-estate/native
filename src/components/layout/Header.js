import {View, StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  }
})

export default function Header({style, children}) {
  return <View style={[styles.container, style]}>{children}</View>
}
