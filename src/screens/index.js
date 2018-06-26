import {Navigation} from 'react-native-navigation'

import {withProvider} from './containers/Provider'
import screens from './modules/screens'

export default function registerScreens() {
  screens.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )
}
