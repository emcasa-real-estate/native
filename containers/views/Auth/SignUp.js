import {Component} from 'react'
import {View} from 'react-native'

import Shell from '@/containers/shared/Shell'
import SignUp from '@/containers/auth/SignUp'

export default class SignUpScreen extends Component {
  onSuccess = ({name}) => {
    const {navigation} = this.props
    const firstName = name.split(' ')[0]
    navigation.replace('success', {
      pageTitle: 'Cadastre-se',
      title: 'Cadastro concluído',
      message: `${firstName}, enviamos um e-mail para você confirmar seu cadastro.`
    })
  }

  render() {
    return (
      <Shell scroll title="Cadastre-se">
        <View testID="@auth.SignUp">
          <SignUp onSuccess={this.onSuccess} />
        </View>
      </Shell>
    )
  }
}

export const screen = SignUpScreen
