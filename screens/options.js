import {Platform} from 'react-native'

import * as colors from '@/assets/colors'

export default {
  layout: {
    backgroundColor: 'white',
    orientation: ['portrait']
  },
  topBar: {
    buttonColor: colors.blue.medium,
    backButtonTitle: '',
    height: 50,
    title: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.gray.dark,
      fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans'
    }
  }
}
