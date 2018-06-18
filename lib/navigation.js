import {Navigation} from 'react-native-navigation'

export function hideBottomTabs({componentId}) {
  Navigation.mergeOptions(this.props.componentId, {
    bottomTabs: {
      translucent: true,
      drawBehind: true,
      visible: false
    }
  })
}

export function showBottomTabs({componentId}) {
  Navigation.mergeOptions(this.props.componentId, {
    bottomTabs: {
      visible: true
    }
  })
}
