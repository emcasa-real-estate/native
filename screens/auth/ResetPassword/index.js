import React, {PureComponent} from 'react'
import {View, ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getData, getError, isLoading} from '@/redux/modules/auth/selectors'
import {resetPassword, reset} from '@/redux/modules/auth'
import Footer from '@/components/shared/Footer'
import Button from '@/components/shared/Button'
import ResetPasswordForm from '@/components/auth/ResetPassword'
import SuccessScreen from '@/screens/shared/Success'

@connect(
  (state) => ({
    response: getData(state),
    error: getError(state),
    loading: isLoading(state)
  }),
  {resetPassword, reset},
  null,
  {withRef: true}
)
export default class ResetPasswordScreen extends PureComponent {
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
    this.props.reset()
    this.setState({value: {}})
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

    return (
      <View style={{flex: 1, display: 'flex'}}>
        <ScrollView style={{flex: 1}}>
          <ResetPasswordForm
            formRef={this.form}
            error={error}
            loading={loading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
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
