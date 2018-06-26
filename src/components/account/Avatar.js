import {View, StyleSheet} from 'react-native'

import Icon from '@/components/shared/Icon'
import * as colors from '@/assets/colors'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: colors.gray.offWhite,
    borderWidth: 1,
    borderColor: colors.gray.lighter
  }
})

export default function Avatar() {
  return (
    <View style={styles.container}>
      <Icon
        size={29}
        name="user-circle"
        type="solid"
        color={colors.gray.medium}
      />
    </View>
  )
}
