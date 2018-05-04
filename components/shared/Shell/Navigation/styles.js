import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 7,
    paddingBottom: 5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.gray.light
  },
  icon: {
    margin: 5
  }
})

export const iconColor = colors.gray.light
