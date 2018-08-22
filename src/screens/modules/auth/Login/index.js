import React, {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getUser, getError, isLoading} from '@/redux/modules/auth/selectors'
import {signIn, reset} from '@/redux/modules/auth'
import {Shell, Body, Footer} from '@/components/layout'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import LoginForm from '@/components/auth/Login'
import SignUpScreen from '@/screens/modules/auth/SignUp'
import ResetPasswordScreen from '@/screens/modules/auth/ResetPassword'
import styles from './styles'

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
    },
    bottomTab: {
      title: 'Login'
    }
  }

  state = {
    value: {}
  }

  form = React.createRef()

  returnToParentScreen() {
    const {componentId, params: {parentId}} = this.props
    if (parentId) Navigation.popTo(parentId)
    else Navigation.popToRoot(componentId)
  }

  componentDidDisappear() {
    this.setState({value: undefined})
  }

  componentDidAppear() {
    this.props.reset()
  }

  componentDidUpdate(prev) {
    const {user} = this.props
    if (user && !prev.user) this.returnToParentScreen()
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {signIn, loading} = this.props
    const {value} = this.state
    if (!loading && this.form.current.onValidate()) signIn(value)
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
    const {loading, error, params: {notice}} = this.props
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
