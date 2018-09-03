import _ from 'lodash'
import React, {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import AccountKit from 'react-native-facebook-account-kit'

import {getUser, getError, isLoading} from '@/redux/modules/auth/selectors'
import {signIn, reset} from '@/redux/modules/auth'
import {updateStackRoot} from '@/screens/modules/navigation'
import {Shell, Body, Footer} from '@/components/layout'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import LoginForm from '@/components/auth/Login'

import SignUpScreen from '@/screens/modules/auth/SignUp'
import ResetPasswordScreen from '@/screens/modules/auth/ResetPassword'
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
    active: false,
    value: {}
  }

  form = React.createRef()

  showView = _.once(() => {
    AccountKit.loginWithPhone()
      .then((token) => console.log('success', token))
      .catch((err) => console.log('error', err))
  })

  componentDidDisappear() {
    this.setState({value: undefined, active: false})
  }

  componentDidAppear() {
    this.props.reset()
    this.setState({active: true})
    this.showView()
  }

  componentDidUpdate(prev) {
    const {user} = this.props
    const {active} = this.state
    if (active && user && !prev.user) this.onSuccess()
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

  onSignUp = () => {
    const {componentId, params} = this.props
    Navigation.push(componentId, {
      component: {
        name: SignUpScreen.screenName,
        passProps: {params}
      }
    })
  }

  onPasswordRecovery = () => {
    const {componentId, params} = this.props
    Navigation.push(componentId, {
      component: {
        name: ResetPasswordScreen.screenName,
        passProps: {params}
      }
    })
  }

  render() {
    const {
      loading,
      error,
      params: {notice}
    } = this.props
    const {value} = this.state

    return (
      <Shell testID="@auth.Login">
        <Body scroll>
          {notice && (
            <View style={styles.notice}>
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          )}
          <LoginForm
            formRef={this.form}
            value={value}
            error={error}
            loading={loading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onSignUp={this.onSignUp}
            onPasswordRecovery={this.onPasswordRecovery}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default connect(
  (state) => ({
    user: getUser(state),
    error: getError(state),
    loading: isLoading(state)
  }),
  {signIn, reset, updateStackRoot},
  null,
  {withRef: true}
)(LoginScreen)
