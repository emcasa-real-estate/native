import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray.dark,
    marginBottom: 10
  },
  activeTitle: {
    color: colors.blue.medium
  }
})
