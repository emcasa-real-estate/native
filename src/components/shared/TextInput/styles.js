import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

export default StyleSheet({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    ...padding(Platform.OS === 'ios' ? 14 : 3, 14),
    ':invalid': {
      borderColor: colors.red.medium
    },
    ':multiline': {
      paddingTop: Platform.OS === 'ios' ? 10 : 5
    }
  },
  input: {
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
    fontSize: 17,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    color: colors.gray.dark
  }
})
