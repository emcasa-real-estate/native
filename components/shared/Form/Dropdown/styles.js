import {Platform} from 'react-native'

import StyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.gray.light,
    height: 50,
    margin: 0,
    ':value': {
      borderColor: colors.blue.pastel
    },
    ':active': {
      borderColor: colors.blue.pastel,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.gray.light,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -2,
    marginLeft: -1,
    overflow: 'hidden',
    ':active': {
      borderColor: colors.blue.pastel
    }
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white'
  },
  lastOption: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  optionText: {
    fontSize: 18,
    padding: 10,
    color: colors.gray.dark
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 14,
    paddingRight: 14
  },
  buttonText: {
    flex: 1,
    color: colors.gray.dark,
    lineHeight: Platform.OS === 'ios' ? null : 18,
    fontSize: 18,
    marginRight: 5
  }
})

export const buttonIconColor = ({active, value}) =>
  active || value ? colors.blue.medium : colors.gray.dark

export const underlayColor = colors.gray.lighter
