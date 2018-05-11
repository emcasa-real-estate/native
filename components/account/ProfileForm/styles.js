import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  input: {
    borderColor: colors.gray.light
  }
})

export const buttonIconColor = colors.blue.medium
export const buttonUnderlayColor = colors.gray.offWhite
