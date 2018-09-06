import _ from 'lodash'
import React, {PureComponent} from 'react'
import {View, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import AccountKit from 'react-native-facebook-account-kit'

import composeWithRef from '@/lib/composeWithRef'
import {withUserProfile, withSignInMutation} from '@/graphql/containers'
import {updateStackRoot} from '@/screens/modules/navigation'
import {Shell, Body} from '@/components/layout'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'

import styles from './styles'

class LoginScreen extends PureComponent {
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
    viewActive: false,
    akActive: false,
    token: undefined,
    error: undefined
  }

  form = React.createRef()

  accountKitLogin = () => {
    this.setState({akActive: true})
    AccountKit.loginWithPhone()
      .then((token) =>
        this.setState({token, akActive: false}, () => {
          if (token) this.onSuccess(token)
        })
      )
      .catch((error) => this.setState({error, akActive: false}))
  }

  componentDidAppear() {
    if (!this.state.viewActive)
      this.setState({viewActive: true}, this.accountKitLogin)
  }

  componentDidDisappear() {
    if (!this.state.akActive) this.setState({viewActive: false})
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {signIn, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) signIn(value)
  }

  onSuccess = () => {
    const {
      updateStackRoot,
      params: {tabIndex}
    } = this.props
    updateStackRoot({tabIndex})
  }

  renderLoginButton() {
    const {
      params: {notice}
    } = this.props
    return (
      <View style={{flex: 1}}>
        {notice && (
          <View style={styles.notice}>
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        )}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button onPress={this.accountKitLogin}>Faça login</Button>
        </View>
      </View>
    )
  }

  renderActivityIndicator() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  renderBody() {
    if (!this.state.akActive) {
      if (!this.state.token) return this.renderLoginButton()
    }
    return this.renderActivityIndicator()
  }

  render() {
    return (
      <Shell testID="@auth.Login">
        <Body>{this.renderBody()}</Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withUserProfile,
  withSignInMutation,
  connect(
    null,
    {updateStackRoot}
  )
)(LoginScreen)
