import {PureComponent} from 'react'
import {View, TouchableOpacity, Clipboard} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Form, {Switch} from '@/components/shared/Form'
import Button from '../FormButton'
import Section from '../FormSection'
import styles, {iconColor} from './styles'

const SwitchField = ({children, warning, ...props}) => (
  <View style={styles.field}>
    <View>
      <Text style={styles.label}>{children}</Text>
      <View style={styles.labelBottom}>{warning}</View>
    </View>
    <Switch {...props} />
  </View>
)

const Warning = ({children, onPress}) => (
  <TouchableOpacity
    style={styles.warning}
    onPress={onPress}
    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
  >
    <Icon name="exclamation-circle" type="solid" size={12} color={iconColor} />
    <Text style={styles.warningText}>{children}</Text>
  </TouchableOpacity>
)

export default class NotificationsForm extends PureComponent {
  render() {
    const {
      user,
      fcmToken,
      hasPermission,
      onRequestPermission,
      ...props
    } = this.props
    let appNotificationWarning
    if (props.value.app && !hasPermission)
      appNotificationWarning = (
        <Warning onPress={onRequestPermission}>Habilitar notificações</Warning>
      )
    return (
      <View style={styles.container}>
        <Form style={styles.form} {...props}>
          <Section title="Aplicativo">
            <SwitchField name="app" warning={appNotificationWarning}>
              Receber notificações pelo app
            </SwitchField>
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
