import _ from 'lodash'
import {Component} from 'react'
import {View} from 'react-native'

import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import TextInput from '@/components/shared/Form/TextInput'
import Section from './Section'
import Button from './Button'
import styles from './styles'

export default class ProfileForm extends Component {
  get value() {
    return _.pick(this.props.user, ['name', 'phone', 'email'])
  }

  render() {
    const {onSubmit, onChangePassword} = this.props

    return (
      <Form onSubmit={onSubmit} value={this.value} style={styles.container}>
        <View style={styles.body}>
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
        </View>
        <Button onPress={onChangePassword} icon="chevron-right">
          Alterar senha
        </Button>
      </Form>
    )
  }
}
