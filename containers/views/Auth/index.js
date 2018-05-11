import {createStackNavigator} from 'react-navigation'

import * as login from './Login'
import * as signUp from './SignUp'
import * as resetPassword from './ResetPassword'
import * as success from './Success'

export const screen = createStackNavigator(
  {login, signUp, resetPassword, success},
  {
    initialRouteName: 'login',
    headerMode: 'none'
  }
)
