import _ from 'lodash'
import {Navigation} from 'react-native-navigation'

import defaultOptions from './options'
import bottomTabs from './modules/tabs'
import {registerScreens} from './modules/screens'

const tabComponent = ({options, ...component}) => ({
  component: {
    ...component,
    options: _.defaultsDeep(options, {bottomTab: defaultOptions.bottomTab})
  }
})

export default function init() {
  registerScreens()
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: bottomTabs.map((component) => ({
            stack: {children: [tabComponent(component)]}
          }))
        }
      }
    })
    Navigation.setDefaultOptions(defaultOptions)
  })
}
