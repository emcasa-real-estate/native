import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation, padding} from '@/assets/styles'

const TIP_HEIGHT = 6
const TIP_WIDTH = 10

export default StyleSheet({
  container: {
    position: 'relative',
    marginBottom: TIP_HEIGHT,
    ...elevation(2)
  },
  body: {
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: colors.blue.medium,
    width: 50,
    ...padding(3.5, null),
    ':active': {
      backgroundColor: 'white'
    }
  },
  text: {
    color: 'white',
    fontWeight: '600',
    ':active': {
      color: colors.blue.medium
    }
  },
  tip: {
    zIndex: 0,
    position: 'absolute',
    bottom: -TIP_HEIGHT,
    left: '50%',
    marginLeft: -(TIP_HEIGHT / 2),
    borderTopWidth: TIP_HEIGHT,
    borderRightWidth: TIP_WIDTH / 2.0,
    borderBottomWidth: 0,
    borderLeftWidth: TIP_WIDTH / 2.0,
    borderTopColor: colors.blue.medium,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    ':active': {
      borderTopColor: 'white'
    }
  }
})
