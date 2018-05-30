import {Component} from 'react'

import {withProfileMutation} from './ProfileMutation'
import {withEmailMutation} from './EmailMutation'
import Form from '@/components/account/ProfileForm'

@withProfileMutation
@withEmailMutation
export default class ProfileFormApp extends Component {
  state = {
    loading: false
  }

  onSubmit = async (value) => {
    const {user, changeEmail, editUserProfile} = this.props
    this.setState({loading: true})
    if (user.email !== value.email)
      await changeEmail({variables: {email: value.email}})
    if (user.name !== value.name || user.phone !== value.phone)
      await editUserProfile({variables: {name: value.name, phone: value.phone}})
    this.setState({loading: false})
  }

  render() {
    const {user, onChangePassword} = this.props
    const {loading} = this.state
    return (
      <Form
        user={user}
        loading={loading}
        onSubmit={this.onSubmit}
        onChangePassword={onChangePassword}
      />
    )
  }
}
