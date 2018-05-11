import {StackNavigator} from 'react-navigation'

import * as menu from './Menu'
import * as editProfile from './EditProfile'
import * as editPassword from './EditPassword'

export const screen = StackNavigator(
  {menu, editProfile, editPassword},
  {
    initialRouteName: 'menu',
    headerMode: 'none'
  }
)
