import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0
  },
  textInputContainer: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light
  },
  textInput: {
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
    fontSize: 17,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    color: colors.gray.dark
  },
  listView: {
    borderWidth: 1,
    borderColor: colors.blue.medium,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -3,
    backgroundColor: 'white'
  },
  row: {
    padding: 10
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray.light
  }
})
