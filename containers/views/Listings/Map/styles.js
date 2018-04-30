import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex'
  },
  body: {
    flex: 1,
    position: 'relative'
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1
  }
})
