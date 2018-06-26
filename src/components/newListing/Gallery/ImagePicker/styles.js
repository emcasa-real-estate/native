import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 0
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    overflow: 'hidden',
    height: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray.light
  },
  buttonLoading: {
    backgroundColor: colors.green.medium,
    borderColor: colors.green.border
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
