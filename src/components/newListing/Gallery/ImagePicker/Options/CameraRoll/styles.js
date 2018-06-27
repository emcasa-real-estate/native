import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  image: {
    borderRadius: 5
  },
  button: {
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.offWhite
  },
  cell: {
    margin: 2.5,
    borderRadius: 5,
    ...elevation(1)
  }
})

export const iconColor = colors.gray.dark
