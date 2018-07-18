import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0
  },
  textInputContainer: {
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  textInput: {
    fontFamily: 'OpenSans',
    fontSize: 17,
    height: 50,
    maxHeight: 50,
    color: colors.gray.dark
  },
  placeholder: {
    color: colors.gray.light
  },
  listView: {
    flex: 0,
    borderWidth: 1,
    borderColor: colors.blue.medium,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -2,
    backgroundColor: 'white'
  },
  row: {
    padding: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray.lighter
  }
})
