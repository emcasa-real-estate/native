import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'

import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {patch} from '@/redux/modules/auth'
import {getUser} from '@/redux/modules/auth/selectors'

function ProfileMutation({children, user, patch}) {
  return (
    <Mutation
      mutation={EDIT_PROFILE}
      variables={{id: user.id}}
      update={(__, {data: {editUserProfile}}) => {
        patch(_.omit(editUserProfile, ['id', '__typename']))
      }}
    >
      {(mutate, props) =>
        children(
          ({variables}) => mutate({variables: {...user, ...variables}}),
          {...props, user}
        )
      }
    </Mutation>
  )
}

const ProfileMutationWithData = connect(
  (state) => ({
    user: getUser(state)
  }),
  {patch}
)(ProfileMutation)

export default ProfileMutationWithData

export const withProfileMutation = (Target) =>
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
          <ProfileMutationWithData>
            {(mutate, ctx) => (
              <Target
                {...this.props}
                {...ctx}
                loading={this.props.loading || ctx.loading}
                editUserProfile={mutate}
              />
            )}
          </ProfileMutationWithData>
        )
      }
    },
    Target
  )
