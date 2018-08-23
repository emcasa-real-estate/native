import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export const iconColor = colors.blue.medium

export default StyleSheet.create({
  links: {
    marginTop: 15,
    alignItems: 'flex-start'
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  linkText: {
    marginLeft: 10,
    color: iconColor
  }
})
