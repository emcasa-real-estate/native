import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'black',
    flex: 1
  },
  gallery: {
    flex: 1,
    width: '100%'
  },
  pagination: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    width: '100%'
  }
})
