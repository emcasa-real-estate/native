import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  gallery: {
    flex: 1,
    width: '100%'
  },
  image: {
    backgroundColor: 'red'
  },
  pagination: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    width: '100%'
  },
  pageIcon: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
