import {AppRegistry, YellowBox} from 'react-native'

import App from '@/containers/App'
import Provider from '@/containers/Provider'

// Temporary fix for
// https://github.com/facebook/react-native/issues/17504
// https://github.com/react-navigation/react-navigation/issues/3956
YellowBox.ignoreWarnings([
  'Class RCTCxxModule was not exported',
  'Module RCTImageLoader requires main queue setup',
  'Warning: isMounted(...) is deprecated'
])

AppRegistry.registerComponent('EmCasa', () => App)

AppRegistry.setWrapperComponentProvider(() => Provider)
