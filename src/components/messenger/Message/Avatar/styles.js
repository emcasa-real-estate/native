import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.medium,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 32,
    height: 32
  }
})
