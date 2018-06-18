import {View, Platform} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default function Shell({children, testID}) {
  return (
    <View style={{flex: 1, display: 'flex'}} testID={testID}>
      {children}
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  )
}

export {default as Body} from './Body'
export {default as Footer} from './Footer'
export {default as Section} from './Section'
