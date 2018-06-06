import {StyleSheet, Dimensions} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 0,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: 15
  },
  image: {
    resizeMode: 'cover'
  }
})

const containerPadding = 15

export const getDimensions = () => ({
  width: Dimensions.get('window').width - containerPadding * 2,
  height: 200
})
