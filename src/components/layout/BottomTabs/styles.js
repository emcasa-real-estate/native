import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white'
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.gray.light
  },
  buttonTextActive: {
    color: colors.blue.medium
  },
  icon: {
    margin: 3
  }
})

export const iconColor = {
  default: colors.gray.light,
  active: colors.blue.medium
}
