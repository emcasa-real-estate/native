import {PureComponent} from 'react'
import {View, Clipboard} from 'react-native'

import Text from '@/components/shared/Text'
import Form, {Switch} from '@/components/shared/Form'
import Button from '../FormButton'
import Section from '../FormSection'
import styles from './styles'

const SwitchField = ({children, ...props}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{children}</Text>
    <Switch {...props} />
  </View>
)

export default class NotificationsForm extends PureComponent {
  render() {
    const {user, fcmToken, ...props} = this.props
    return (
      <View style={styles.container}>
        <Form style={styles.form} {...props}>
          <Section title="Aplicativo">
            <SwitchField name="app">Receber notificações pelo app</SwitchField>
          </Section>
          <Section title="Email">
            <SwitchField name="email">
              Receber notificações por e-mail
            </SwitchField>
          </Section>
        </Form>
        {user.role === 'admin' && (
          <Button icon="fire" onPress={() => Clipboard.setString(fcmToken)}>
            {fcmToken}
          </Button>
        )}
      </View>
    )
  }
}
