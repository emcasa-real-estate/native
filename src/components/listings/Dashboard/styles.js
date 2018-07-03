import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  propTitle: {
    display: 'flex',
    flexDirection: 'row'
  },
  propTitleText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.gray.dark
  },
  propValueText: {
    fontSize: 16,
    color: colors.gray.dark
  }
})

export const iconColor = colors.gray.dark
