import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray.lighter,
    width: '100%'
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    padding: 10
  }
})

export const iconColor = colors.gray.dark
