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
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: colors.gray.light,
    marginTop: 3
  },
  icon: {
    margin: 5
  }
})

export const iconColor = colors.gray.light
