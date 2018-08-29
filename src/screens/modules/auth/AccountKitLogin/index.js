import React, {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import AccountKit from 'react-native-facebook-account-kit'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot} from '@/screens/modules/navigation'
import {Shell, Body, Footer} from '@/components/layout'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import LoginForm from '@/components/auth/Login'

import SignUpScreen from '@/screens/modules/auth/SignUp'
import styles from './styles'

class AKLoginScreen extends PureComponent {
  static screenName = 'auth.Login'

  static options = {
    topBar: {
      title: {text: 'Login'}
    },
    bottomTab: {
      title: 'Login'
    }
  }

  state = {
    accountKitViewShown: false
  }

  form = React.createRef()

  componentDidAppear() {
    this.setState({accountKitViewShown: false})
  }

  onSuccess = () => {
    const {
      updateStackRoot,
      params: {tabIndex}
    } = this.props
    updateStackRoot({tabIndex})
  }

  onSignUp = () => {
    const {componentId, params} = this.props
    Navigation.push(componentId, {
      component: {
        name: SignUpScreen.screenName,
        passProps: {params}
      }
    })
  }

  onShowLoginScreen = async () => {
    try {
      const token = await AccountKit.loginWithPhone()
      if (token) {
        //
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      params: {notice}
    } = this.props
    return (
      <Shell testID="@auth.Login">
        <Body scroll>
          {notice && (
            <View style={styles.notice}>
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          )}
          <Button onPress={this.onShowLoginScreen}>Login</Button>
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {updateStackRoot}
  )
)(AKLoginScreen)
