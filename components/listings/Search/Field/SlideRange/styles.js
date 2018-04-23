import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, margin} from '@/assets/styles'

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: -10
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  labelText: {
    fontSize: 18
  },
  labelSuffix: {
    fontSize: 14
  },
  body: {
    margin: 60
  },
  divider: {
    fontSize: 14,
    ...margin(5, 10, null)
  },
  slider: {
    height: null
  },
  track: {
    height: 5
  },
  trackActive: {
    backgroundColor: colors.blue.pastel
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
    borderColor: colors.gray.lighter,
    backgroundColor: colors.gray.$f0f0,
    ...elevation(3)
  }
})
