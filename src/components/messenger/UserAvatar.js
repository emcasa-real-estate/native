import {View} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'

const $styles = StyleSheet({
  avatar: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    borderWidth: 1,
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.medium,
    ':isSender': {
      backgroundColor: colors.gray.offWhite,
      borderColor: colors.gray.light
    }
  },
  avatarText: {
    fontWeight: '600',
    color: colors.blue.medium
  }
})

const initials = (name) => {
  const nameParts = name.split(' ', 2)
  if (nameParts.length === 1) return name.slice(0, 2).toUpperCase()
  else return (name[0][0] + name[1][0]).toUpperCase()
}

export default $styles.inject()(function Avatar({styles, name}) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials(name)}</Text>
    </View>
  )
})
