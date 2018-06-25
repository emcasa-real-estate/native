import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray.light,
    backgroundColor: colors.gray.offWhite
  },
  buttonText: {
    fontSize: 20,
    paddingTop: 10,
    color: colors.gray.medium
  },
  buttonTextLoading: {
    color: 'white'
  },
  activityIndicator: {
    marginTop: 20
  }
})

export const iconColor = colors.blue.medium
