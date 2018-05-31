import React, {PureComponent} from 'react'
import {View} from 'react-native'
import {withNavigationFocus} from 'react-navigation'

import Shell from '@/containers/shared/Shell'
import Login from '@/containers/auth/Login'

@withNavigationFocus
export default class LoginScreen extends PureComponent {
  state = {
    valid: true
  }

  form = React.createRef()

  onValidate = (valid) => this.setState({valid})

  onSuccess = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  onSignUp = () => {
    const {navigation} = this.props
    navigation.navigate('signUp')
  }

  onPasswordRecovery = () => {
    const {navigation} = this.props
    navigation.navigate('resetPassword')
  }

  render() {
    const {isFocused} = this.props
    return (
      <Shell scroll title="Login">
        <View testID="@auth.Login">
          <Login
            enabled={isFocused}
            onSignUp={this.onSignUp}
            onPasswordRecovery={this.onPasswordRecovery}
            onSuccess={this.onSuccess}
          />
        </View>
      </Shell>
    )
  }
}

export const screen = LoginScreen
