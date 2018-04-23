import {StackNavigator} from 'react-navigation'

import * as form from './Form'
import * as neighborhoods from './Neighborhoods'

export const screen = StackNavigator(
  {
    form,
    neighborhoods
  },
  {
    initialRouteName: 'form',
    initialRouteParams: {},
    headerMode: 'none'
  }
)
