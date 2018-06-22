import {Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default {
  topBar: {
    backButtonTitle: '',
    title: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.gray.dark,
      fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans'
    }
  },
  bottomTabs: {
    translucent: true,
    drawBehind: true,
    animate: false,
    visible: false
  }
}
