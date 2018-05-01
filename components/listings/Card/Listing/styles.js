import {StyleSheet} from 'react-native'

import $StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default $StyleSheet({
  container: {
    padding: 15,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray.lighter,
    borderRadius: 5,
    ':active': {
      backgroundColor: colors.gray.offWhite
    }
  },
  thumbnail: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 5
  },
  image: {
    width: '100%'
  },
  body: {
    marginTop: 10,
    marginBottom: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
