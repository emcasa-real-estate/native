import {PureComponent} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Form, {Switch} from '@/components/shared/Form'
import Section from '../FormSection'
import styles from './styles'

export default class NotificationsForm extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Form style={styles.form} {...this.props}>
          <Section title="Aplicativo">
            <Switch name="app" />
          </Section>
          <Section title="Email">
            <Switch name="email" />
          </Section>
        </Form>
      </View>
    )
  }
}
