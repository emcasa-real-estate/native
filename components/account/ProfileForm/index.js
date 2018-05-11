import _ from 'lodash'
import React, {Component} from 'react'
import {View} from 'react-native'
import {Gateway} from 'react-gateway'

import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import TextInput from '@/components/shared/Form/TextInput'
import Header from '@/components/shared/Form/SubmitHeader'
import Button from '../FormButton'
import Section from '../FormSection'
import styles from './styles'

export default class ProfileForm extends Component {
  form = React.createRef()

  constructor(props) {
    super(props)
    this.state = _.pick(props.user, ['name', 'phone', 'email'])
  }

  onChange = (value) => this.setState(value)

  onSubmit = () => {
    if (this.form.current.onValidate()) this.props.onSubmit(this.state)
  }

  isInputActive = (key) => this.state[key] !== this.props.user[key]

  render() {
    const {onChangePassword, loading} = this.props

    return (
      <View style={styles.container}>
        <Gateway into="header">
          <Header
            loading={loading}
            title="Editar perfil"
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
          <Section active={this.isInputActive('name')} title="Nome completo">
            <TextInput
              name="name"
              placeholder="Nome"
              validations={[required('O nome é obrigatório')]}
            />
          </Section>
          <Section
            active={this.isInputActive('email')}
            title="Endereço de email"
          >
            <Email name="email" />
          </Section>
          <Section active={this.isInputActive('phone')} title="Telefone">
            <Phone name="phone" validations={[required(false)]} />
          </Section>
        </Form>
        <Button onPress={onChangePassword} icon="chevron-right">
          Alterar senha
        </Button>
      </View>
    )
  }
}
