import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.blue.light
  },
  header: {
    padding: 10
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.blue.medium,
    marginTop: 10,
    marginBottom: 25
  },
  message: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.gray.dark
  }
})

export const iconColor = colors.gray.dark
