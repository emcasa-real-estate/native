import _ from 'lodash'
import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, rightTriangle} from '@/assets/styles'

export const LABEL_HEIGHT = 25
export const LABEL_WIDTH = 60
export const TIP_SIZE = 5

const styles = StyleSheet.create({
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
    height: LABEL_HEIGHT + TIP_SIZE,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 0,
    bottom: 0,
    left: '50%',
    //marginTop: -TIP_HEIGHT,
    marginLeft: -TIP_SIZE,
    width: TIP_SIZE * 2,
    height: TIP_SIZE
  },
  labelTipSide: rightTriangle({
    color: 'white',
    size: TIP_SIZE
  })
})

export default styles

const TIP_OFFSET_LOWER_BOUND = -(LABEL_WIDTH - TIP_SIZE) / 2

const TIP_OFFSET_UPPER_BOUND = LABEL_WIDTH / 2 - TIP_SIZE * 2 - 2

export const labelTip = {
  container: (offset) => [
    styles.labelTip,
    {
      marginLeft: _.clamp(
        -TIP_SIZE / 2 + offset,
        TIP_OFFSET_LOWER_BOUND,
        TIP_OFFSET_UPPER_BOUND
      )
    }
  ],
  right: () => [styles.labelTipSide, {transform: [{rotate: '90deg'}]}],
  left: () => [styles.labelTipSide]
}
