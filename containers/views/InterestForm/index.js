import {SwitchNavigator} from 'react-navigation'

import * as form from './Form'
import * as calendly from './Calendly'
import * as success from './Success'

export const screen = SwitchNavigator(
  {form, calendly, success},
  {
    initialRouteName: 'form',
    resetOnBlur: false
  }
)

export default screen
