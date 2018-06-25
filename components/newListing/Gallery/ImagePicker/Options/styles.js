import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: colors.gray.dark + '50'
  },
  button: {
    borderRadius: 5,
    backgroundColor: colors.gray.offWhite,
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: colors.gray.dark
  },
  closeButtonText: {
    fontWeight: '500',
    color: colors.blue.medium
  }
})

export const iconColor = colors.gray.dark

export const buttonUnderlayColor = colors.gray.lighter
