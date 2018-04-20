import {StackNavigator} from 'react-navigation'

import * as filter from './Filter'
import * as neighborhoods from './Neighborhoods'

export const screen = StackNavigator(
  {
    filter,
    neighborhoods
  },
  {
    initialRouteName: 'filter',
    initialRouteParams: {},
    headerMode: 'none'
  }
)
