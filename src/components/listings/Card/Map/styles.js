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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 5,
    ':primary': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopWidth: 4,
      borderColor: colors.blue.medium,
      backgroundColor: colors.blue.medium,
      marginTop: -4
    }
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
    alignItems: 'center'
  },
  street: {
    color: colors.gray.darker,
    flex: 1,
    fontSize: 14,
    marginRight: 15
  },
  priceText: {
    fontWeight: '300',
    fontSize: 16,
    color: colors.gray.darker
  }
})
