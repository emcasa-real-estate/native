import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45
  },
  title: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 40,
    ':root': {
      paddingRight: 0
    }
  },
  titleText: {
    fontSize: 20,
    color: colors.gray.medium
  },
  button: {
    marginLeft: 10
  }
})

export const iconColor = colors.gray.mediumDark
