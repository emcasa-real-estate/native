import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 45
  },
  title: {
    zIndex: 0,
    flex: 1,
    display: 'flex',
    fontSize: 20,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.gray.dark
  },
  resetButton: {
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 10,
    height: 45
  },
  activityIndicator: {
    position: 'absolute',
    paddingLeft: 10
  },
  resetLink: {
    fontSize: 14,
    color: colors.blue.medium,
    fontWeight: '500'
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 10,
    height: 45
  }
})

export const iconColor = colors.gray.mediumDark
