import {View, Platform} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default function Shell({style, children, testID}) {
  return (
    <View style={[{flex: 1, display: 'flex'}].concat(style)} testID={testID}>
      {children}
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  )
}

export function Modal({style, ...props}) {
  return (
    <Shell
      style={[{marginTop: Platform.OS === 'ios' ? 20 : 0}].concat(style)}
      {...props}
    />
  )
}

export {default as Body} from './Body'
export {default as Footer} from './Footer'
export {default as Section} from './Section'
