import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export const invalidTextColor = colors.orange.medium
export const validTextColor = colors.green.medium

export default StyleSheet.create({
  text: {
    width: 280,
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    color: colors.gray.dark
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    marginVertical: 15,
    marginHorizontal: 40,
    color: colors.gray.dark
  },
  sellingPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25
  },
  sellingPointText: {
    marginTop: 50
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray.lighter
  },
  step: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25
  },
  stepIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepText: {
    fontWeight: '500',
    fontSize: 23
  },
  stepDescription: {
    marginTop: 25
  }
})
