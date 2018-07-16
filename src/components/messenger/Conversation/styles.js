import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export const buttonIconColor = colors.blue.medium

export const buttonUnderlayColor = colors.blue.pastel

export default StyleSheet({
  container: {
    position: 'relative',
    flex: 1
  },
  listContainer: {
    zIndex: 0,
    flex: 1
  },
  list: {
    paddingVertical: 15
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: buttonIconColor,
    backgroundColor: colors.blue.light
  }
})
