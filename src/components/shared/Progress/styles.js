import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 10,
    backgroundColor: colors.gray.offWhite
  },
  progress: {
    backgroundColor: colors.blue.pastel,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  progressComplete: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  background: {
    flex: 1
  }
})
