import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
    maxHeight: 160
  },
  inputContainer: {
    flex: 1
  },
  button: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17.5,
    marginLeft: 10,
    marginTop: 2.5,
    borderWidth: 1,
    borderColor: colors.blue.medium,
    backgroundColor: colors.blue.light
  }
})

export const buttonIconColor = colors.blue.medium
export const buttonUnderlayColor = colors.blue.pastel
