import _ from 'lodash/fp'
import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import {withProvider} from '@/containers/shared/Provider'
import * as listingsScreens from './listings'
import * as sharedScreens from './shared'

const SCREENS = _.flow(
  _.map(_.values),
  ([...screens]) => _.concat(...screens),
  _.filter((screen) => typeof screen === 'function')
)([sharedScreens, listingsScreens])

const setDefaults = () =>
  Navigation.setDefaultOptions({
    topBar: {
      height: 50,
      hideBackButtonTitle: true,
      title: {
        height: 50,
        fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
        color: colors.gray.dark
      }
    }
  })

const registerScreens = () =>
  SCREENS.map((Screen) =>
    Navigation.registerComponent(Screen.screen, () => withProvider(Screen))
  )

const setRoot = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [{component: {id: 'root', name: 'listings.Feed'}}]
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
