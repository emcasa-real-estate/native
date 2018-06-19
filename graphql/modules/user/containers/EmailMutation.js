import _ from 'lodash'
import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {EDIT_EMAIL} from '@/graphql/modules/user/mutations'
import {patch} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'

function EmailMutation({children, user, patch}) {
  return (
    <Mutation
      mutation={EDIT_EMAIL}
      update={(__, {data: {changeEmail}}) => {
        patch(_.omit(changeEmail, ['id', '__typename']))
      }}
    >
      {(mutate, props) =>
        children(
          ({variables}) => mutate({variables: {id: user.id, ...variables}}),
          {...props, user}
        )
      }
    </Mutation>
  )
}

const EmailMutationWithData = connect(
  (state) => ({
    user: getUser(state)
  }),
  {patch}
)(EmailMutation)

export default EmailMutationWithData

export const withEmailMutation = (Target) => (props) => (
  <EmailMutationWithData>
    {(mutate, ctx) => (
      <Target
        {...props}
        {...ctx}
        loading={props.loading || ctx.loading}
        changeEmail={mutate}
      />
    )}
  </EmailMutationWithData>
)
