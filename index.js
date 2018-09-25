import 'moment/locale/pt-br'
import moment from 'moment'
import {YellowBox} from 'react-native'
import codePush from 'react-native-code-push'

import initNavigation from '@/screens'

function initCodePush() {
  codePush.sync({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME
  })
}

// Temporary fix for
// https://github.com/facebook/react-native/issues/17504
YellowBox.ignoreWarnings([
  'Class RCTCxxModule was not exported',
  'Module RCTImageLoader requires main queue setup',
  'Module ReactNativeKeyboardManager requires main queue setup',
  'Warning: isMounted(...) is deprecated',
  'Remote debugger'
])

moment.locale('pt-br')

initNavigation()
initCodePush()
