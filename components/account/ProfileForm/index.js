import {Component} from 'react'
import {View} from 'react-native'

import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import TextInput from '@/components/shared/Form/TextInput'
import Button from '../FormButton'
import Section from '../FormSection'
import styles from './styles'

export default class ProfileForm extends Component {
  isInputActive = (key) =>
    this.props.value[key] !== (this.props.user[key] || '')

  render() {
    const {onEditPassword, ...props} = this.props

    return (
      <View style={styles.container}>
        <Form style={styles.form} {...props}>
          <Section active={this.isInputActive('name')} title="Nome completo">
            <TextInput
              style={styles.input}
              name="name"
              placeholder="Nome"
              validations={[required('O nome é obrigatório')]}
            />
          </Section>
          <Section
            active={this.isInputActive('email')}
            title="Endereço de email"
          >
            <Email style={styles.input} name="email" />
          </Section>
          <Section active={this.isInputActive('phone')} title="Telefone">
            <Phone
              style={styles.input}
              name="phone"
              validations={[required(false)]}
            />
          </Section>
        </Form>
        <Button onPress={onEditPassword} icon="chevron-right">
          Alterar senha
        </Button>
      </View>
    )
  }
}
