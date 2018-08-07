import {Platform} from 'react-native'

import * as colors from '@/assets/colors'

const OpenSans = Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans'

export default {
  layout: {
    backgroundColor: 'white',
    orientation: ['portrait']
  },
  topBar: {
    buttonColor: colors.blue.medium,
    backButtonTitle: '',
    height: 50,
    elevation: 1,
    borderColor: colors.gray.light,
    title: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.gray.dark,
      fontFamily: OpenSans
    }
  },
  bottomTab: {
    badgeColor: colors.blue.medium,
    iconColor: colors.gray.dark,
    selectedIconColor: colors.blue.medium,
    textColor: colors.gray.dark,
    selectedTextColor: colors.blue.medium,
    fontFamily: OpenSans
  }
}
