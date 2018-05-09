import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  section: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray.mediumDark,
    marginTop: 5,
    marginBottom: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 1,
    marginTop: -1
  }
})

export const buttonIconColor = colors.gray.mediumDark
export const buttonUnderlayColor = colors.gray.offWhite
