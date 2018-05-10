import _ from 'lodash'
import {Component} from 'react'
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
  get value() {
    return _.pick(this.props.user, ['name', 'phone', 'email'])
  }

  render() {
    const {onSubmit, onChangePassword} = this.props

    return (
      <View style={styles.container}>
        <Gateway into="header">
          <Header
            title="Editar Perfil"
            buttonText="Salvar"
            onSubmit={onSubmit}
          />
        </Gateway>
        <Form value={this.value} style={styles.form}>
          <Section title="Nome completo">
            <TextInput
              name="name"
              placeholder="Nome"
              validations={[required('O nome é obrigatório')]}
            />
          </Section>
          <Section title="Endereço de email">
            <Email name="email" />
          </Section>
          <Section title="Telefone">
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
