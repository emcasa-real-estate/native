import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    margin: 15
  },
  inlineText: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginRight: 5
  },
  error: {
    fontSize: 16,
    color: colors.red.medium,
    marginBottom: 10
  }
})
