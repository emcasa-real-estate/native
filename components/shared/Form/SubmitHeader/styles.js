import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45
  },
  title: {
    flex: 1,
    display: 'flex',
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'center',
    color: colors.gray.dark
  },
  resetButton: {
    position: 'relative',
    marginRight: 15
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
    marginLeft: 10
  }
})

export const iconColor = colors.gray.mediumDark
