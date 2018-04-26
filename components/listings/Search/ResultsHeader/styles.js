import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {margin, padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    ...padding(10, 20, 15)
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: colors.gray.light,
    ...margin(null, 16)
  },
  textActive: {
    color: colors.gray.dark
  },
  icon: {
    marginTop: 6,
    marginBottom: 6
  },
  button: {
    fontSize: 13,
    color: colors.blue.medium
  }
})
