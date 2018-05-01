import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.gray.$f0f0
  },
  text: {
    fontSize: 18
  }
})

export const highlightColor = colors.gray.$f0f0

export const iconColor = {
  default: colors.gray.lighter,
  active: colors.blue.medium
}
