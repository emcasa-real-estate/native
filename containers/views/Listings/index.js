import {createStackNavigator} from 'react-navigation'

import * as results from './Results'
import * as search from './Search'
import * as map from './Map'

export const screen = createStackNavigator(
  {results, search, map},
  {
    initialRouteName: 'results',
    initialRouteParams: {},
    headerMode: 'none'
  }
)
