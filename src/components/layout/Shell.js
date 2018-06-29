import {View} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default function Shell({style, children, testID}) {
  return (
    <View style={[{flex: 1, display: 'flex'}].concat(style)} testID={testID}>
      {children}
      <KeyboardSpacer />
    </View>
  )
}
