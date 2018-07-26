import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    paddingHorizontal: 14,
    paddingVertical: 0,
    height: 50,
    ':invalid': {
      borderColor: colors.red.medium
    }
  },
  input: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
    fontSize: 17,
    color: colors.gray.dark,
    textAlignVertical: 'center',
    paddingVertical: Platform.OS === 'ios' ? 7.5 : 0
  }
})
