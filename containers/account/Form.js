import {Component} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import {
  EDIT_EMAIL,
  EDIT_PASSWORD,
  EDIT_PROFILE
} from '@/lib/graphql/mutations/account'
import {patch} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'
import Form from '@/components/account/Form'

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
@createMutation(EDIT_PASSWORD, 'changePassword')
@createMutation(EDIT_PROFILE, 'editUserProfile')
export default class FormApp extends Component {
  render() {
    const {user, changeEmail, changePassword, editUserProfile} = this.props
    return (
      <Form
        user={user}
        onSubmitEmail={changeEmail}
        onSubmitPassword={changePassword}
        onSubmitProfile={editUserProfile}
      />
    )
  }
}
