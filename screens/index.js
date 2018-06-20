import _ from 'lodash/fp'
import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import {withProvider} from '@/screens/containers/Provider'
import * as authScreens from './auth'
import * as accountScreens from './account'
import * as listingScreens from './listing'
import * as listingsScreens from './listings'
import * as interestScreens from './interest'
import * as sharedScreens from './shared'

const SCREENS = _.flow(
  _.map(_.values),
  ([...screens]) => [].concat(...screens),
  _.filter((screen) => screen.screenName)
)([
  authScreens,
  accountScreens,
  listingScreens,
  listingsScreens,
  interestScreens,
  sharedScreens
])

const setDefaults = () =>
  Navigation.setDefaultOptions({
    topBar: {
      height: 50,
      title: {
        height: 50,
        fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
        color: colors.gray.dark
      }
    },
    bottomTabs: {
      translucent: true,
      drawBehind: true,
      animate: false,
      visible: false
    }
  })

const registerScreens = () =>
  SCREENS.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )

export default function initNavigation() {
  registerScreens()
  Navigation.events().registerAppLaunchedListener(() => {
    setDefaults()
  })
}
