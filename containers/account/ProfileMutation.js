import _ from 'lodash'
import {connect} from 'react-redux'
import {Mutation} from 'react-apollo'

import {EDIT_PROFILE} from '@/lib/graphql/mutations/account'
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
          ({variables}) => mutate({variables: {id: user.id, ...variables}}),
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

export const withProfileMutation = (Target) => (props) => (
  <ProfileMutationWithData>
    {(mutate, ctx) => (
      <Target
        {...props}
        {...ctx}
        loading={props.loading || ctx.loading}
        editUserProfile={mutate}
      />
    )}
  </ProfileMutationWithData>
)
