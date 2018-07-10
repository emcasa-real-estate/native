import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10
  },
  inputContainer: {
    flex: 1
  },
  button: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 7.5,
    borderWidth: 1,
    borderColor: colors.blue.border,
    backgroundColor: colors.blue.light
  }
})

export const buttonIconColor = colors.blue.border
export const buttonUnderlayColor = colors.blue.pastel
