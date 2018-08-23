import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getData, getError, isLoading} from '@/redux/modules/auth/selectors'
import {resetPassword, reset} from '@/redux/modules/auth'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import ResetPasswordForm from '@/components/auth/ResetPassword'
import SuccessScreen from '@/screens/modules/shared/Success'

class ResetPasswordScreen extends PureComponent {
  static screenName = 'auth.ResetPassword'

  static options = {
    topBar: {
      title: {text: 'Lembrar senha'}
    }
  }

  state = {
    value: {}
  }

  form = React.createRef()

  componentDidDisappear() {
    this.setState({value: undefined})
  }

  componentDidMount() {
    this.props.reset()
  }

  onChange = (value) => this.setState({value})

  componentDidUpdate(prev) {
    const {response, loading, error} = this.props
    const finishedLoading = prev.loading && !loading
    const success = !error && response
    if (finishedLoading && success) this.onSuccess()
  }

  onSubmit = () => {
    const {resetPassword, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) resetPassword(value)
  }

  onSuccess = () => {
    Navigation.showModal({
      component: {
        id: `${this.props.componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          title: 'Email enviado',
          children:
            'Enviamos um e-mail pra você com instruções para criar uma nova senha.',
          onDismiss: this.onDismiss
        }
      }
    })
  }

  onDismiss = () => {
    Navigation.dismissModal(`${this.props.componentId}_success`)
    Navigation.popToRoot(this.props.componentId)
  }

  render() {
    const {loading, error} = this.props
    const {value} = this.state

    return (
      <Shell testID="@auth.ResetPassword">
        <Body scroll>
          <ResetPasswordForm
            formRef={this.form}
            value={value}
            error={error}
            loading={loading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
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
    response: getData(state),
    error: getError(state),
    loading: isLoading(state)
  }),
  {resetPassword, reset},
  null,
  {withRef: true}
)(ResetPasswordScreen)
