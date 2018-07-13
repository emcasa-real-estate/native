import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textContainer: {
    zIndex: 1,
    flex: 1,
    padding: 10
  },
  background: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export const pathStyle = ({isSender}) => ({
  strokeLinecap: 'round',
  strokeWidth: 1.5,
  stroke: isSender ? colors.gray.light : colors.blue.medium,
  fill: isSender ? colors.gray.offWhite : colors.blue.light
})
