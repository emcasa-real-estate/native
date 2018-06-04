import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

const CIRCLE_RADIUS = 100
export default StyleSheet({
  container: {
    position: 'relative'
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: colors.blue.medium + '25'
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: colors.blue.medium,
    ...elevation(2)
  }
})
