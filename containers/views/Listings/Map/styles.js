import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex'
  },
  body: {
    flex: 1
  },
  actionButton: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1
  }
})
