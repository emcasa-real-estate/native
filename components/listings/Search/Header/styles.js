import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

const offset = Platform.OS === 'ios' ? 20 : 0

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray.lighter,
    ...padding(15 + offset, 10, 15)
  },
  icon: {
    fontSize: 40
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300'
  },
  button: {
    fontSize: 14,
    color: colors.blue.medium
  }
})
