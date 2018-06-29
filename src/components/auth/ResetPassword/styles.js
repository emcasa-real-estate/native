import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    margin: 15
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15
  },
  error: {
    fontSize: 16,
    color: colors.red.medium,
    marginBottom: 10
  }
})
