import {Component} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import {EDIT_EMAIL, EDIT_PROFILE} from '@/lib/graphql/mutations/account'
import {patch} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import Form from '@/components/account/ProfileForm'

const createMutation = (QUERY, name) =>
  graphql(QUERY, {
    props: ({mutate, ownProps: {user, patch}}) => ({
      [name]: async (variables) => {
        const {data} = await mutate({variables: {id: user.id, ...variables}})
        const userData = data[name]
        delete userData.id
        delete userData.__typename
        patch(userData)
      }
    })
  })

@connect(
  (state) => ({
    user: getUser(state)
  }),
  {patch}
)
@createMutation(EDIT_EMAIL, 'changeEmail')
@createMutation(EDIT_PROFILE, 'editUserProfile')
export default class EditAccountFormApp extends Component {
  onSubmit = (value) => {
    const {user, changeEmail, editUserProfile} = this.props
    if (user.email !== value.email) changeEmail({email: value.email})
    if (user.name !== value.name || user.phone !== value.phone)
      editUserProfile({name: value.name, phone: value.phone})
  }

  render() {
    const {user, onChangePassword} = this.props
    return (
      <Form
        user={user}
        onSubmit={this.onSubmit}
        onChangePassword={onChangePassword}
      />
    )
  }
}
