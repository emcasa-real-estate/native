import React, {Component} from 'react'
import {View} from 'react-native'
import {Gateway} from 'react-gateway'

import Form from '@/components/shared/Form/Form'
import Password from '@/components/shared/Form/Password'
import Header from '@/components/shared/Form/SubmitHeader'
import Section from '../FormSection'
import styles from './styles'

export default class PasswordForm extends Component {
  state = {}

  form = React.createRef()

  onChange = (value) => this.setState(value)

  onSubmit = () => {
    if (this.form.current.onValidate()) this.props.onSubmit(this.state)
  }

  validatePasswordConfirmation = (value) => {
    if (value && this.state.newPassword !== value)
      return 'A senha está incorreta'
  }

  render() {
    return (
      <View style={styles.container}>
        <Gateway into="header">
          <Header
            title="Alterar senha"
            buttonText="Salvar"
            onSubmit={this.onSubmit}
          />
        </Gateway>
        <Form
          formRef={this.form}
          value={this.state}
          onChange={this.onChange}
          style={styles.form}
        >
          <Section title="Senha atual">
            <Password name="currentPassword" />
          </Section>
          <Section title="Nova senha">
            <Password name="newPassword" />
          </Section>
          <Section title="Confirmar nova senha">
            <Password
              name="confirmNewPassword"
              validations={[this.validatePasswordConfirmation]}
            />
          </Section>
        </Form>
      </View>
    )
  }
}
