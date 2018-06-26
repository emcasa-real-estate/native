import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  gallery: {
    flex: 1,
    width: '100%'
  },
  image: {
    backgroundColor: colors.gray.darker
  },
  pagination: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    width: '100%'
  },
  pageIcon: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
