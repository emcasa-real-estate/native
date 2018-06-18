import {View, StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {margin} from '@/assets/styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray.$f0f0,
    paddingTop: 40,
    paddingBottom: 50
  },
  title: {
    color: colors.gray.dark,
    fontWeight: '600',
    fontSize: 13,
    ...margin(null, 20, 10)
  }
})

export default function Section({title, children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      {children}
    </View>
  )
}
