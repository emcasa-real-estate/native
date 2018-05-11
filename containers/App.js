import {Component} from 'react'
import {View, StatusBar, SafeAreaView} from 'react-native'
import {createStackNavigator} from 'react-navigation'

import OrientationProvider from '@/containers/shared/Orientation/Provider'
import views from '@/containers/views'

const Stack = createStackNavigator(views, {
  initialRouteName: 'listings',
  initialRouteParams: {},
  headerMode: 'float',
  navigationOptions: {
    header: null
  }
})

const viewStyle = {width: '100%', height: '100%', overflow: 'hidden'}

// Wrap StackNavigator in a Component class for hot module replacement
// https://github.com/facebook/react-native/issues/8465
export default class App extends Component {
  render() {
    return (
      <OrientationProvider>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={viewStyle}>
          <View style={viewStyle}>
            <Stack />
          </View>
        </SafeAreaView>
      </OrientationProvider>
    )
  }
}
