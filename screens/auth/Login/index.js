import React, {PureComponent} from 'react'
import {View, ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getUser, getError, isLoading} from '@/redux/modules/auth/selectors'
import {signIn, reset} from '@/redux/modules/auth'
import Footer from '@/components/shared/Footer'
import Button from '@/components/shared/Button'
import LoginForm from '@/components/auth/Login'
import ResetPasswordScreen from '@/screens/auth/ResetPassword'

@connect(
  (state) => ({
    user: getUser(state),
    error: getError(state),
    loading: isLoading(state)
  }),
  {signIn, reset},
  null,
  {withRef: true}
)
export default class LoginScreen extends PureComponent {
  static screenName = 'auth.Login'

  static options = {
    topBar: {
      title: {text: 'Login'}
    }
  }

  state = {
    value: {}
  }

  form = React.createRef()

  componentDidDisappear() {
    this.props.reset()
    this.setState({value: {}})
  }

  componentDidUpdate() {
    const {enabled, user} = this.props
    if (enabled && user) this.onSuccess()
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {signIn, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) signIn(value)
  }

  onSignUp = () => {
    Navigation.push(this.props.componentId, {
      component: {name: null}
    })
  }

  onPasswordRecovery = () => {
    Navigation.push(this.props.componentId, {
      component: {name: ResetPasswordScreen.screenName}
    })
  }

  render() {
    const {loading, error} = this.props

    return (
      <View style={{flex: 1, display: 'flex'}}>
        <ScrollView style={{flex: 1}}>
          <LoginForm
            formRef={this.form}
            error={error}
            loading={loading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onSignUp={this.onSignUp}
            onPasswordRecovery={this.onPasswordRecovery}
          />
        </ScrollView>
        <Footer>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </View>
    )
  }
}
