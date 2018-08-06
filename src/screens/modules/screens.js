import _ from 'lodash/fp'

import * as authScreens from './auth/screens'
import * as accountScreens from './account/screens'
import * as listingScreens from './listing/screens'
import * as listingFormScreens from './listingForm/screens'
import * as listingsScreens from './listings/screens'
import * as interestScreens from './interest/screens'
import * as messengerScreens from './messenger/screens'
import * as sharedScreens from './shared/screens'
import AuthTab from './AuthTab'

const screens = _.flow(
  _.map(_.values),
  ([...screens]) => [].concat(...screens),
  _.filter((screen) => screen.screenName)
)([
  {AuthTab},
  authScreens,
  accountScreens,
  listingScreens,
  listingFormScreens,
  listingsScreens,
  interestScreens,
  messengerScreens,
  sharedScreens
])

export default screens

export const getScreenByName = (name) =>
  screens.find((Screen) => Screen.screenName === name)
