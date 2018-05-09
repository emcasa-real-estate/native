import {Component} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import {
  EDIT_EMAIL,
  EDIT_PASSWORD,
  EDIT_PROFILE
} from '@/lib/graphql/mutations/account'
import {getUser} from '@/redux/modules/auth/selectors'
import Form from '@/components/account/Form'

const createMutation = (QUERY, callback) =>
  graphql(QUERY, {
    props: ({mutate, ownProps: {user}}) => ({
      [callback]: (variables) =>
        mutate({variables: {id: user.id, ...variables}})
    })
  })

@connect((state) => ({
  user: getUser(state)
}))
@createMutation(EDIT_EMAIL, 'onEditEmail')
@createMutation(EDIT_PASSWORD, 'onEditPassword')
@createMutation(EDIT_PROFILE, 'onEditProfile')
export default class FormApp extends Component {
  render() {
    const {user, onEditEmail, onEditPassword, onEditProfile} = this.props
    return (
      <Form
        user={user}
        onSubmitEmail={onEditEmail}
        onSubmitPassword={onEditPassword}
        onSubmitProfile={onEditProfile}
      />
    )
  }
}
