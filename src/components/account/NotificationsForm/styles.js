import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    color: colors.gray.mediumDark
  }
})
