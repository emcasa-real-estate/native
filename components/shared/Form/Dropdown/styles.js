import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    height: 50,
    margin: 0
  },
  text: {
    color: colors.gray.dark,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    fontSize: 18,
    padding: 14
  }
})
