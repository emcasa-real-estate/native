import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.gray.lighter
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray.mediumDark
  },
  button: {
    fontSize: 12,
    color: colors.blue.medium
  }
})
