import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  section: {
    marginLeft: 20,
    marginRight: 20
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray.dark,
    marginBottom: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  buttonText: {
    fontSize: 17,
    color: colors.blue.medium
  }
})

export const buttonIconColor = colors.blue.medium
export const buttonUnderlayColor = colors.gray.offWhite
