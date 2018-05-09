import {Component} from 'react'
import {View} from 'react-native'

import Form from '@/components/shared/Form/Form'
import EmailForm from './Email'
import PasswordForm from './Password'
import ProfileForm from './Profile'

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
      <Form onSubmit={this.onSubmit} value={values}>
        <ProfileForm
          onChange={this.onChangeForm('profile')}
          value={values.profile}
        />
        <EmailForm onChange={this.onChangeForm('email')} value={values.email} />
        <PasswordForm
          onChange={this.onChangeForm('password')}
          value={values.password}
        />
      </Form>
    )
  }
}
