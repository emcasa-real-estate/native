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
    color: colors.gray.mediumDark
  },
  labelBottom: {
    marginTop: 2.5,
    height: 15
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  warningText: {
    fontSize: 12,
    color: colors.gray.medium,
    fontWeight: '500',
    marginHorizontal: 5
  }
})

export const iconColor = colors.blue.medium
