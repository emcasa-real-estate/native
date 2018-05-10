import _ from 'lodash'
import {Component} from 'react'
import {View} from 'react-native'
import {Gateway} from 'react-gateway'

import Form from '@/components/shared/Form/Form'
import Password from '@/components/shared/Form/Password'
import Header from '@/components/shared/Form/SubmitHeader'
import Section from '../FormSection'
import styles from './styles'

export default class PasswordForm extends Component {
  state = {}

  onChange = (value) => this.setState(value)

  onSubmit = () => this.props.onSubmit(this.state)

  validateEquals = (field) => (value) => this.state[field] === value

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
        <Form value={this.state} onChange={this.onChange} style={styles.form}>
          <Section title="Senha atual">
            <Password name="currentPassword" />
            <Password name="newPassword" />
            <Password
              name="confirmNewPassword"
              validations={[this.validateEquals('newPassword')]}
            />
          </Section>
        </Form>
      </View>
    )
  }
}
