import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export default StyleSheet({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  container: {
    flex: 1,
    ':overlay': {
      paddingTop: Platform.OS === 'ios' ? 20 : null
    }
  },
  main: {
    flex: 1,
    zIndex: 0
  },
  header: {
    margin: 0,
    width: '100%',
    borderColor: colors.gray.lighter,
    borderBottomWidth: 0.8,
    ':borderless': {
      borderBottomWidth: 0
    },
    ':overlay': {
      borderBottomWidth: 0,
      position: 'absolute',
      zIndex: 1
    }
  },
  footer: {
    flex: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 0.8,
    ...elevation(6)
  }
})
