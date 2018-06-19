import {View, ScrollView, Platform} from 'react-native'
import KeyboardManager from 'react-native-keyboard-manager'

const reloadKeyboardLayout =
  Platform.OS === 'ios'
    ? () => KeyboardManager.reloadLayoutIfNeeded()
    : undefined

export default function Body({style, scroll, children}) {
  const ViewComponent = scroll ? ScrollView : View
  return (
    <ViewComponent
      style={[{flex: 1, zIndex: 0}, style]}
      onLayout={reloadKeyboardLayout}
    >
      {children}
    </ViewComponent>
  )
}
