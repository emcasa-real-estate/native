import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 2.5
  },
  header: {
    backgroundColor: colors.blue.pastel,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 5,
    right: 5
  },
  image: {
    zIndex: 0
  },
  cell: {
    padding: 2.5
  }
})

export const iconColor = colors.gray.dark
