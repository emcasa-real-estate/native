import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export const iconColor = colors.gray.darker

export const linkColor = colors.blue.medium

const thumbnailOverlay = {
  zIndex: 1,
  left: 0,
  width: '100%',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff98'
}

export default StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray.lighter,
    borderRadius: 5
  },
  thumbnail: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 5
  },
  image: {zIndex: 0},
  topBar: {
    ...thumbnailOverlay,
    top: 0,
    height: 30,
    alignItems: 'flex-end'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  linkText: {
    color: linkColor
  },
  bottomBar: {
    ...thumbnailOverlay,
    bottom: 0,
    height: 55,
    flexDirection: 'row'
  },
  buttonContainer: {flex: 0.5},
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.gray.dark
  },
  body: {
    marginTop: 10,
    marginBottom: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5
  },
  street: {
    color: colors.gray.darker,
    flex: 1,
    fontSize: 16,
    marginRight: 15
  },
  neighborhood: {
    color: colors.gray.mediumDark,
    fontSize: 12,
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
