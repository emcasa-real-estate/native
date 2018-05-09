import _ from 'lodash'
import React, {Component} from 'react'

import Form from '@/components/shared/Form/Form'
import Section from './Section'
import EmailForm from './Email'
import PasswordForm from './Password'
import ProfileForm from './Profile'
import styles from './styles'

export default class EditAccountForm extends Component {
  forms = {
    email: React.createRef(),
    password: React.createRef(),
    profile: React.createRef()
  }

  state = {
    values: {},
    defaultValues: {}
  }

  static getDerivedStateFromProps({user}, state) {
    const defaultValues = {
      profile: {
        name: user.name,
        phone: user.phone
      },
      email: {
        email: user.email
      }
    }
    return {
      values: _.merge(defaultValues, state.values),
      defaultValues
    }
  }

  onChangeForm = (key) => (value) =>
    this.setState(({values}) => ({
      values: {
        ...values,
        [key]: value
      }
    }))

  onSubmit = () => {
    const {values, defaultValues} = this.state
    const forms = [
      ['email', this.props.onSubmitEmail],
      ['password', this.props.onSubmitPassword],
      ['profile', this.props.onSubmitProfile]
    ]
    forms.forEach(([key, onSubmit]) => {
      const form = this.forms[key].current
      const formValue = values[key]
      if (
        formValue &&
        form.onValidate() &&
        !_.isEqual(formValue, defaultValues[key])
      )
        onSubmit(formValue)
    })
  }

  render() {
    const {values} = this.state
    return (
      <Form onSubmit={this.onSubmit} value={values} style={styles.container}>
        <Section title="Perfil">
          <ProfileForm
            value={values.profile}
            formRef={this.forms.profile}
            onChange={this.onChangeForm('profile')}
          />
        </Section>
        <Section title="Email">
          <EmailForm
            value={values.email}
            formRef={this.forms.email}
            onChange={this.onChangeForm('email')}
          />
        </Section>
        <Section title="Alterar senha">
          <PasswordForm
            value={values.password}
            formRef={this.forms.password}
            onChange={this.onChangeForm('password')}
          />
        </Section>
      </Form>
    )
  }
}
