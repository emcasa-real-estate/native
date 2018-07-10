import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

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
    alignItems: 'baseline',
    marginBottom: 5
  },
  buttonsRow: {
    marginBottom: 10
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
    fontWeight: '400',
    color: colors.gray.darker
  }
})

export const iconColor = colors.gray.dark
