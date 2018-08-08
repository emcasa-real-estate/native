import _ from 'lodash/fp'
import {Navigation} from 'react-native-navigation'

import {withProvider} from '@/containers/Provider'
import * as authScreens from './auth/screens'
import * as accountScreens from './account/screens'
import * as listingScreens from './listing/screens'
import * as listingFormScreens from './listingForm/screens'
import * as listingsScreens from './listings/screens'
import * as interestScreens from './interest/screens'
import * as messengerScreens from './messenger/screens'
import * as sharedScreens from './shared/screens'
import * as tabScreens from './tabs/screens'

const screens = _.flow(
  _.map(_.values),
  ([...screens]) => [].concat(...screens),
  _.filter((screen) => screen.screenName)
)([
  authScreens,
  accountScreens,
  listingScreens,
  listingFormScreens,
  listingsScreens,
  interestScreens,
  messengerScreens,
  sharedScreens,
  tabScreens
])

export default screens

export const getScreenByName = (name) =>
  screens.find((Screen) => Screen.screenName === name)

export const registerScreens = () =>
  screens.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )
