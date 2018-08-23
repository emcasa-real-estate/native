import {StyleSheet, Platform} from 'react-native'

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
    bottom: 10,
    right: 10,
    zIndex: 1
  },
  headerButton: Platform.select({
    android: {width: 55},
    ios: {}
  })
})
