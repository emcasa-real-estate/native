import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  textContainer: {
    zIndex: 1,
    flex: 1,
    padding: 10
  },
  text: {
    color: colors.gray.dark
  },
  background: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0
  }
})
