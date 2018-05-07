import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    height: 50,
    margin: 0,
    ':value': {
      borderColor: colors.blue.pastel
    }
  },
  text: {
    color: colors.gray.dark,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    fontSize: 18,
    padding: 14
  }
})
