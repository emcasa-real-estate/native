import {PureComponent} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Form from '@/components/shared/Form/Form'
import Password from '@/components/shared/Form/Password'
import Section from '../FormSection'
import styles from './styles'

export default class PasswordForm extends PureComponent {
  validatePasswordConfirmation = (value) => {
    if (value && this.props.value.newPassword !== value)
      return 'A senha está incorreta'
  }

  render() {
    const {message, ...props} = this.props

    return (
      <View style={styles.container}>
        <Form style={styles.form} {...props}>
          {message && (
            <Text style={[styles.message, styles[`${message.type}Message`]]}>
              {message.text}
            </Text>
          )}
          <Section title="Senha atual">
            <Password
              style={styles.input}
              name="currentPassword"
              placeholder="Senha atual"
            />
          </Section>
          <Section title="Nova senha">
            <Password
              style={styles.input}
              name="newPassword"
              placeholder="Nova senha"
            />
          </Section>
          <Section title="Confirmar nova senha">
            <Password
              style={styles.input}
              name="confirmNewPassword"
              placeholder="Confirmar nova senha"
              validations={[this.validatePasswordConfirmation]}
            />
          </Section>
        </Form>
      </View>
    )
  }
}
