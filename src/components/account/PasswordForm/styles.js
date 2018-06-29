import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingBottom: 15
  },
  input: {
    borderColor: colors.gray.light
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  errorMessage: {
    color: colors.red.medium
  },
  successMessage: {
    color: colors.green.medium
  }
})

export const buttonIconColor = colors.blue.medium
export const buttonUnderlayColor = colors.gray.offWhite
