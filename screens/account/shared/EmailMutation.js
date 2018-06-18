import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'

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

export const withEmailMutation = (Target) =>
  hoistNonReactStatics(
    class extends PureComponent {
      static displayName = `withUserListings(${Target.displayName ||
        Target.name})`

      instance = React.createRef()

      getWrappedInstance() {
        return this.instance.current
      }

      render() {
        return (
          <EmailMutationWithData>
            {(mutate, ctx) => (
              <Target
                {...this.props}
                {...ctx}
                ref={this.instance}
                loading={this.props.loading || ctx.loading}
                changeEmail={mutate}
              />
            )}
          </EmailMutationWithData>
        )
      }
    },
    Target
  )
