import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0,
    position: 'relative',
    height: 50,
    zIndex: 1
  },
  textInputContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 5,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light
  },
  textInput: {
    fontSize: 18,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    color: colors.gray.dark
  },
  listView: {
    borderWidth: 1,
    borderColor: colors.blue.medium,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: 50 - 3,
    left: 0,
    width: '100%',
    backgroundColor: 'white'
  }
})
