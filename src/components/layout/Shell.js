import {View} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default function Shell({
  style,
  children,
  testID,
  disableKeyboardSpacer
}) {
  return (
    <View style={[{flex: 1, display: 'flex'}].concat(style)} testID={testID}>
      {children}
      {!disableKeyboardSpacer && <KeyboardSpacer />}
    </View>
  )
}
