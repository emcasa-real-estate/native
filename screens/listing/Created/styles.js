import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export const invalidTextColor = colors.orange.medium
export const validTextColor = colors.green.medium

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    paddingRight: 30
  },
  icon: {
    marginTop: 5,
    marginRight: 10
  },
  text: {
    fontSize: 16,
    color: colors.gray.dark
  }
})
