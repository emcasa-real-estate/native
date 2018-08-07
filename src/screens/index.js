import {Navigation} from 'react-native-navigation'

import {withProvider} from '@/containers/Provider'
import bottomTabs from './tabs'
import defaultOptions from './options'
import screens from './modules/screens'

export default function registerScreens() {
  screens.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: bottomTabs.map((component) => ({
            stack: {children: [{component}]}
          }))
        }
      }
    })
    Navigation.setDefaultOptions(defaultOptions)
  })
}
