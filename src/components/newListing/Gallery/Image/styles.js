import {StyleSheet, Dimensions} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation, padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 0,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: 15
  },
  image: {
    zIndex: 0,
    resizeMode: 'cover'
  },
  tag: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.blue.light,
    borderBottomRightRadius: 5,
    ...padding(5, 10),
    ...elevation(3)
  },
  tagText: {
    color: colors.blue.medium,
    fontWeight: 'bold'
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    top: 15,
    right: 15
  }
})

const containerPadding = 15

export const getDimensions = () => ({
  width: Dimensions.get('window').width - containerPadding * 2,
  height: 200
})
