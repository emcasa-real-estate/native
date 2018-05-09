import _ from 'lodash'
import React, {Component} from 'react'

import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import TextInput from '@/components/shared/Form/TextInput'
import Section from './Section'
import Button from './Button'
import styles from './styles'

export default class EditAccountForm extends Component {
  forms = {
    email: React.createRef(),
    password: React.createRef(),
    profile: React.createRef()
  }

  state = {}

  static getDerivedStateFromProps({user}, state) {
    return _.merge(
      {
        name: user.name,
        phone: user.phone,
        email: user.email
      },
      state
    )
  }

  onChange = (value) => this.setState(value)

  render() {
    const {onSubmit, onChangePassword} = this.props

    return (
      <Form onSubmit={onSubmit} value={this.state} style={styles.container}>
        <Section title="Nome">
          <TextInput
            name="name"
            placeholder="Nome"
            validations={[required('O nome é obrigatório')]}
          />
        </Section>
        <Section title="Telefone">
          <Phone name="phone" validations={[required(false)]} />
        </Section>
        <Section title="Email">
          <Email name="email" />
        </Section>
        <Button onPress={onChangePassword} icon="chevron-right">
          Sair
        </Button>
      </Form>
    )
  }
}
