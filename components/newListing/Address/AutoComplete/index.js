import {Platform} from 'react-native'

import AutoCompleteIOS from './AutoCompleteIOS'
import AutoCompleteAndroid from './AutoCompleteAndroid'

export default Platform.select({
  ios: AutoCompleteIOS,
  android: AutoCompleteAndroid
})
