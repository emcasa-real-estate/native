import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    paddingHorizontal: Platform.OS === 'ios' ? 14 : 3,
    paddingVertical: 14,
    ':invalid': {
      borderColor: colors.red.medium
    }
  },
  input: {
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
    fontSize: 17,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    color: colors.gray.dark
  }
})
