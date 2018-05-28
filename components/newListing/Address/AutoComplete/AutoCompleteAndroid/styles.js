import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0
  },
  textInputContainer: {
    display: 'flex',
    paddingTop: 5,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 18,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    color: colors.gray.dark
  },
  textInputButton: {
    paddingLeft: 15,
    paddingRight: 15
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
  }
})
