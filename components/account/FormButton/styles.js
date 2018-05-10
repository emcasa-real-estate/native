import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 17,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  text: {
    fontSize: 19,
    color: colors.blue.medium
  }
})

export const iconColor = colors.blue.medium
export const underlayColor = colors.gray.offWhite
