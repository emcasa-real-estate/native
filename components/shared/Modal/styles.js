import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import {padding} from '@/assets/styles'

export default StyleSheet({
  container: {
    flex: 1,
    display: 'flex',
    position: 'relative'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...padding(10, 20),
    ':overlay': {
      position: 'absolute',
      zIndex: 100,
      top: Platform.OS === 'ios' ? 20 : 0
    }
  },
  closeButton: {
    marginTop: 10
  },
  title: {
    flex: 1,
    ...padding(0, 40, 0, 15),
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  body: {
    flex: 1,
    zIndex: 0
  }
})
