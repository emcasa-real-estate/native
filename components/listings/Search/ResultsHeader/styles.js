import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, margin, padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: colors.gray.lighter,
    borderWidth: 0.8,
    borderRadius: 5,
    ...margin(10, 20),
    ...padding(7, 10),
    ...elevation(6)
  },
  text: {
    flex: 1,
    color: colors.gray.light,
    ...margin(null, 15)
  },
  textActive: {
    color: colors.gray.dark
  },
  icon: {
    fontSize: 24,
    color: colors.gray.mediumDark,
    marginTop: 2,
    marginBottom: -2
  },
  button: {
    fontSize: 13,
    color: colors.blue.medium
  }
})
