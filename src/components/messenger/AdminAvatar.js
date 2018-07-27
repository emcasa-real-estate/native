import {View, Image} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

const $styles = StyleSheet({
  container: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.medium,
    ':isSender': {
      backgroundColor: colors.gray.offWhite,
      borderColor: colors.gray.light
    }
  },
  logo: {
    width: 32,
    height: 32
  }
})

export default $styles.inject()(function AdminAvatar({styles}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@/assets/img/icon-android.png')}
      />
    </View>
  )
})
