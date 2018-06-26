import React, {PureComponent} from 'react'
import {View, ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getUser, getError, isLoading} from '@/redux/modules/auth/selectors'
import {signUp, reset} from '@/redux/modules/auth'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import SignUpForm from '@/components/auth/SignUp'
import SuccessScreen from '@/screens/modules/shared/Success'

@connect(
  (state) => ({
    user: getUser(state),
    error: getError(state),
    loading: isLoading(state)
  }),
  {signUp, reset},
  null,
  {withRef: true}
)
export default class SignUpScreen extends PureComponent {
  static screenName = 'auth.SignUp'

  static options = {
    topBar: {
      title: {text: 'Cadastre-se'}
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
    const {user} = this.props
    if (!prev.user && user) this.onSuccess()
  }

  onSubmit = () => {
    const {signUp, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) signUp(value)
  }

  onSuccess = () => {
    const {user: {name}} = this.props
    const firstName = name.split(' ')[0]
    Navigation.showModal({
      component: {
        id: `${this.props.componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          title: 'Cadastro concluído',
          children: `${firstName}, enviamos um e-mail para você confirmar seu cadastro.`,
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
      <Shell testID="@auth.SignUp">
        <Body scroll>
          <SignUpForm
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
