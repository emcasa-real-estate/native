import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    ...padding(10, 40)
  },
  field: {
    paddingTop: 20
  },
  separator: {
    marginTop: 20
  },
  validation: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.red.medium,
    marginTop: 5
  }
})
