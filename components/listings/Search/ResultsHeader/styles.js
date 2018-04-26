import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, margin} from '@/assets/styles'

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
    padding: 10,
    ...margin(10, 20),
    ...elevation(6)
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
