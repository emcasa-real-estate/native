import {Component} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import {EDIT_PASSWORD} from '@/lib/graphql/mutations/account'
import {getUser} from '@/redux/modules/auth/selectors'
import Form from '@/components/account/PasswordForm'

@connect((state) => ({
  user: getUser(state)
}))
@graphql(EDIT_PASSWORD, {
  props: ({mutate, ownProps: {user}}) => ({
    changePassword: (variables) =>
      mutate({variables: {id: user.id, ...variables}})
  })
})
export default class PasswordFormApp extends Component {
  render() {
    return <Form onSubmit={this.props.changePassword} />
  }
}
