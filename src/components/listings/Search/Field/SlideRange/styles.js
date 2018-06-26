import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, margin} from '@/assets/styles'

export default StyleSheet.create({
  body: {
    margin: 60
  },
  slider: {
    height: null
  },
  track: {
    height: 5
  },
  trackActive: {
    backgroundColor: colors.gray.medium
  },
  trackInactive: {
    backgroundColor: colors.gray.$f0f0
  },
  markerContainer: {
    padding: 10
  },
  marker: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.blue.dark,
    backgroundColor: colors.blue.medium,
    marginBottom: -2.5,
    ...elevation(3)
  }
})
