import {Component} from 'react'
import {View, Text, Button} from 'react-native'
import 'moment/locale/pt-br'
import moment from 'moment'
import {YellowBox} from 'react-native'
import AccountKit from 'react-native-facebook-account-kit'

import initNavigation from '@/screens'

const akView = (text) =>
  class MyComponent extends Component {
    static options = {
      width: 100,
      height: 50
    }

    render() {
      return (
        <View style={{flex: 1, backgroundColor: 'gray', height: 50}}>
          <Button onPress={() => console.log('pressed', text)} title={text} />
        </View>
      )
    }
  }

AccountKit.configure({
  responseType: 'token',
  defaultCountry: 'BR',
  receiveSMS: true,
  advancedUI: {
    header: akView('Header'),
    footer: akView('Footer'),
    body: akView('Body')
  }
})

// Temporary fix for
// https://github.com/facebook/react-native/issues/17504
YellowBox.ignoreWarnings([
  'Class RCTCxxModule was not exported',
  'Module RCTImageLoader requires main queue setup',
  'Module ReactNativeKeyboardManager requires main queue setup',
  'Warning: isMounted(...) is deprecated',
  'Remote debugger'
])

moment.locale('pt-br')

initNavigation()
