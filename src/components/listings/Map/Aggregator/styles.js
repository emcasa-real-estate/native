import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

const SIZE = 28

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    width: SIZE,
    height: SIZE,
    backgroundColor: colors.blue.medium,
    borderColor: 'white',
    borderWidth: 2,
    ...elevation(2)
  },
  text: {
    color: 'white',
    fontWeight: '500'
  }
})
