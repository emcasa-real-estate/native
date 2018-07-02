import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export const LABEL_HEIGHT = 25
export const LABEL_WIDTH = 60
export const TIP_HEIGHT = 6

const TIP_SIZE = Math.sqrt(Math.pow(TIP_HEIGHT, 2) / 2) * 2

export default StyleSheet.create({
  body: {
    marginHorizontal: 60,
    marginBottom: 60,
    marginTop: 10
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
  },
  labelContainer: {
    position: 'relative',
    height: 50,
    ...elevation(2)
  },
  label: {
    position: 'absolute',
    top: 0,
    height: LABEL_HEIGHT + TIP_HEIGHT,
    marginLeft: 60 - LABEL_WIDTH / 2
  },
  labelBody: {
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',

    alignItems: 'center'
  },
  labelTip: {
    position: 'absolute',
    zIndex: 0,
    bottom: 2,
    left: '50%',
    marginTop: -TIP_HEIGHT,
    marginLeft: -TIP_HEIGHT / 2,
    width: TIP_SIZE,
    height: TIP_SIZE,
    backgroundColor: 'white',
    transform: [{rotate: '45deg'}]
  }
})
