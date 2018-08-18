import _ from 'lodash'
import {Navigation} from 'react-native-navigation'

import defaultOptions from './options'
import bottomTabs from './modules/tabs'
import {registerScreens} from './modules/screens'

export default function init() {
  registerScreens()
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions(defaultOptions)
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: bottomTabs.map((component) => ({
            stack: {children: [{component}]}
          }))
        }
      }
    })
  })
}
