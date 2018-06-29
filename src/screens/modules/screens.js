import _ from 'lodash/fp'

import * as authScreens from './auth/screens'
import * as accountScreens from './account/screens'
import * as listingScreens from './listing/screens'
import * as listingFormScreens from './listingForm/screens'
import * as listingsScreens from './listings/screens'
import * as interestScreens from './interest/screens'
import * as sharedScreens from './shared/screens'

export default _.flow(
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
  sharedScreens
])
