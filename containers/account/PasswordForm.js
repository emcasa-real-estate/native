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
  state = {
    loading: false,
    errors: null
  }

  onSubmit = async (data) => {
    const {changePassword} = this.props
    this.setState({loading: true})
    const {loading, errors} = await changePassword(data)
    this.setState({loading, errors})
  }

  render() {
    const {loading, error} = this.state
    return <Form onSubmit={this.onSubmit} loading={loading} error={error} />
  }
}
