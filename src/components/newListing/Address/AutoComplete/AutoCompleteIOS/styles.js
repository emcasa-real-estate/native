import {StyleSheet} from 'react-native'

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
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    borderColor: colors.gray.light
  },
  textInput: {
    fontFamily: 'Open Sans',
    fontSize: 17,
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
