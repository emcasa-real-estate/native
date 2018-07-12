import $StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation, margin} from '@/assets/styles'

export default $StyleSheet({
  container: {
    padding: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    ...elevation(4),
    ':active': {
      backgroundColor: colors.gray.offWhite
    }
  },
  thumbnail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  image: {
    width: '100%'
  },
  body: {
    margin: 20,
    marginTop: 15
  },
  street: {
    color: colors.gray.mediumDark,
    flex: 1,
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 5
  },
  neighborhood: {
    color: colors.gray.mediumDark,
    fontWeight: '600'
  },
  priceText: {
    fontWeight: '300',
    color: colors.gray.darker
  },
  iconButton: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 15
  }
})
