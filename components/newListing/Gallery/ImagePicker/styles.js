import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 0
  },
  button: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray.light
  },
  buttonText: {
    fontSize: 20,
    paddingTop: 10,
    color: colors.gray.medium
  }
})

export const iconColor = colors.blue.medium
