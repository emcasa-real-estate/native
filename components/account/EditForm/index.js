import {Component} from 'react'

import Form from '@/components/shared/Form/Form'
import Section from './Section'
import EmailForm from './Email'
import PasswordForm from './Password'
import ProfileForm from './Profile'
import styles from './styles'

export default class EditAccountForm extends Component {
  state = {
    values: {}
  }

  onChangeForm = (key) => (value) =>
    this.setState(({values}) => ({
      values: {
        ...values,
        [key]: value
      }
    }))

  onSubmit = (values) => {
    const {onSubmit} = this.props
  }

  render() {
    const {values} = this.state
    return (
      <Form onSubmit={this.onSubmit} value={values} style={styles.container}>
        <Section title="Perfil">
          <ProfileForm
            onChange={this.onChangeForm('profile')}
            value={values.profile}
          />
        </Section>
        <Section title="Email">
          <EmailForm
            onChange={this.onChangeForm('email')}
            value={values.email}
          />
        </Section>
        <Section title="Alterar senha">
          <PasswordForm
            onChange={this.onChangeForm('password')}
            value={values.password}
          />
        </Section>
      </Form>
    )
  }
}
