import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  body: {
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.blue.medium,
    marginTop: 10,
    marginBottom: 25
  },
  message: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.gray.dark
  }
})
