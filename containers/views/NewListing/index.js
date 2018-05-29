import {createStackNavigator} from 'react-navigation'

import * as address from './Address'
import * as properties from './Properties'
import * as success from './Success'

export const screen = createStackNavigator(
  {address, properties, success},
  {
    initialRouteName: 'address',
    initialRouteParams: {},
    headerMode: 'none'
  }
)
