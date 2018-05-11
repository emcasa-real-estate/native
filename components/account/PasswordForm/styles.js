import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingBottom: 15
  },
  error: {
    fontSize: 16,
    color: colors.red.medium,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  }
})

export const buttonIconColor = colors.blue.medium
export const buttonUnderlayColor = colors.gray.offWhite
