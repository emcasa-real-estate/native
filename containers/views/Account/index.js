import {StackNavigator} from 'react-navigation'

import * as menu from './Menu'
import * as editProfile from './EditProfile'

export const screen = StackNavigator(
  {menu, editProfile},
  {
    initialRouteName: 'menu',
    headerMode: 'none'
  }
)
