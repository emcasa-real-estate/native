import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export default StyleSheet({
  container: {
    position: 'relative'
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: colors.gray.medium,
    ...elevation(2),
    ':active': {
      backgroundColor: colors.blue.medium
    }
  }
})

export const circleColor = colors.blue.medium + '25'
