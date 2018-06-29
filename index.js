import {YellowBox, Platform} from 'react-native'
import KeyboardManager from 'react-native-keyboard-manager'

import initNavigation from '@/screens'

// Temporary fix for
// https://github.com/facebook/react-native/issues/17504
YellowBox.ignoreWarnings([
  'Class RCTCxxModule was not exported',
  'Module RCTImageLoader requires main queue setup',
  'Module ReactNativeKeyboardManager requires main queue setup',
  'Warning: isMounted(...) is deprecated',
  'Remote debugger'
])

initNavigation()

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true)
  KeyboardManager.setKeyboardDistanceFromTextField(100)
  KeyboardManager.setPreventShowingBottomBlankSpace(true)
  KeyboardManager.setEnableAutoToolbar(process.env.NODE_ENV === 'e2e')
  KeyboardManager.setToolbarDoneBarButtonItemText('done')
  KeyboardManager.setToolbarManageBehaviour(1)
  KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false)
  KeyboardManager.setToolbarPreviousNextButtonEnable(false)
  KeyboardManager.setShouldShowTextFieldPlaceholder(true)
  KeyboardManager.setOverrideKeyboardAppearance(false)
  KeyboardManager.setShouldResignOnTouchOutside(true)
  KeyboardManager.resignFirstResponder()
}
