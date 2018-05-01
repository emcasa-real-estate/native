import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    ...padding(10, 20)
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...padding(7, null)
  },
  property: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  propertyText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray.mediumDark
  },
  icon: {
    paddingRight: 15
  },
  value: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})

export const iconColor = colors.gray.dark
