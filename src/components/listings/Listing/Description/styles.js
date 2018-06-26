import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    display: 'flex',
    ...padding(10, 20)
  },
  title: {
    color: colors.gray.darker,
    fontWeight: '700',
    marginBottom: 10
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    ...padding(10, null, 20)
  },
  subSection: {
    flex: 0.4
  },
  text: {
    color: colors.gray.darker,
    fontSize: 17,
    lineHeight: 30,
    fontWeight: '300'
  }
})
