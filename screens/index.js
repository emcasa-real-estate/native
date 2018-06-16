import _ from 'lodash/fp'
import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import {withProvider} from '@/containers/shared/Provider'
import * as authScreens from './auth'
import * as sharedScreens from './shared'

const SCREENS = _.flow(
  _.values,
  _.filter((screen) => typeof screen === 'function')
)({
  ...authScreens,
  ...sharedScreens
})

const setDefaults = () =>
  Navigation.setDefaultOptions({
    topBar: {
      height: 50,
      title: {
        height: 50,
        fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
        color: colors.gray.dark
      }
    }
  })

const registerScreens = () =>
  SCREENS.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )

const setRoot = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [{component: {id: 'root', name: 'auth.Login'}}]
      }
    }
  })

export default function initNavigation() {
  registerScreens()
  Navigation.events().registerAppLaunchedListener(() => {
    setDefaults()
    setRoot()
  })
}
