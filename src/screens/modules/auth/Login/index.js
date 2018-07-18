import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getUser, getError, isLoading} from '@/redux/modules/auth/selectors'
import {signIn, reset} from '@/redux/modules/auth'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import LoginForm from '@/components/auth/Login'
import SignUpScreen from '@/screens/modules/auth/SignUp'
import ResetPasswordScreen from '@/screens/modules/auth/ResetPassword'

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
    value: {}
  }

  form = React.createRef()

  componentDidDisappear() {
    this.setState({value: undefined})
  }

  componentDidAppear() {
    this.props.reset()
  }

  componentDidUpdate(prev) {
    const {user, componentId} = this.props
    if (user && !prev.user) Navigation.popToRoot(componentId)
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {signIn, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) signIn(value)
  }

  onSignUp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'sign_up',
        name: SignUpScreen.screenName
      }
    })
  }

  onPasswordRecovery = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'reset_password',
        name: ResetPasswordScreen.screenName
      }
    })
  }

  render() {
    const {loading, error} = this.props
    const {value} = this.state

    return (
      <Shell testID="@auth.Login">
        <Body scroll>
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
  {signIn, reset},
  null,
  {withRef: true}
)(LoginScreen)
