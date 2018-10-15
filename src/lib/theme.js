import {Platform} from 'react-native'
import {fas} from '@fortawesome/pro-solid-svg-icons'
import {fal} from '@fortawesome/pro-light-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import theme from '@emcasa/ui'

export default {
  ...theme,
  icons: {
    default: fal,
    solid: fas,
    light: fal,
    brands: fab
  },
  fontFamily: Platform.select({
    ios: 'OpenSans',
    android: 'Open Sans'
  })
}
