import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 17,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  text: {
    flex: 1,
    fontSize: 19,
    color: colors.blue.medium
  },
  label: {
    flex: 0,
    marginRight: 5
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    height: 25,
    backgroundColor: colors.blue.medium,
    borderRadius: 12.5
  },
  labelText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500'
  }
})

export const iconColor = colors.blue.medium
export const underlayColor = colors.gray.offWhite
