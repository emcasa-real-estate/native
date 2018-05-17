import {StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
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
  }
})
