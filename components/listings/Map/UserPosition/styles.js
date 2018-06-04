import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation, padding} from '@/assets/styles'

const TIP_HEIGHT = 6

const TIP_SIZE = Math.sqrt(Math.pow(TIP_HEIGHT, 2) / 2) * 2

export default StyleSheet({
  container: {
    position: 'relative',
    paddingBottom: TIP_HEIGHT,
    ...elevation(2)
  },
  body: {
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
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
    position: 'absolute',
    zIndex: 0,
    bottom: 2,
    left: '50%',
    marginTop: -TIP_HEIGHT,
    marginLeft: -TIP_HEIGHT / 2,
    width: TIP_SIZE,
    height: TIP_SIZE,
    backgroundColor: colors.blue.medium,
    transform: [{rotate: '45deg'}],
    ':active': {
      backgroundColor: 'white'
    }
  }
})
