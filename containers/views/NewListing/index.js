import {createStackNavigator} from 'react-navigation'

import * as address from './Address'
import * as properties from './Properties'

export const screen = createStackNavigator(
  {address, properties},
  {
    initialRouteName: 'address',
    initialRouteParams: {},
    headerMode: 'none'
  }
)
