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
  buttonIcon: {
    fontSize: 40,
    color: colors.gray.mediumDark
  },
  resetButton: {
    fontSize: 14,
    color: colors.blue.medium,
    fontWeight: '500',
    marginRight: 15
  }
})
