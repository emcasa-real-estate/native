import {Navigation} from 'react-native-navigation'

import defaultOptions from './options'
import bottomTabs from './modules/tabs'
import {registerScreens} from './modules/screens'

export default function init() {
  registerScreens()
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
