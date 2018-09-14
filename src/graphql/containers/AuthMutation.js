import {Mutation, withApollo} from 'react-apollo'

import {
  AK_SIGN_IN,
  SIGN_OUT,
  STORE_CREDENTIALS
} from '@/graphql/modules/user/mutations'
import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'

const withAuthMutation = (mutationName, Mutation) => (Target) =>
  withApollo(({client, ...props}) => (
    <Mutation client={client}>
      {(mutate, state) => (
        <Target
          {...{
            ...props,
            [mutationName]: Object.assign(
              (variables) => mutate({variables}),
              state
            )
          }}
        />
      )}
    </Mutation>
  ))

export function SignInMutation({children, client, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={AK_SIGN_IN}
      update={function(cache, {data: {accountKitSignIn}}) {
        if (accountKitSignIn)
          client.mutate({
            mutation: STORE_CREDENTIALS,
            variables: accountKitSignIn,
            refetchQueries: [{query: GET_USER_PROFILE}]
          })
      }}
    >
      {children}
    </Mutation>
  )
}

export const withSignInMutation = withAuthMutation('signIn', SignInMutation)

export function SignOutMutation({children, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={SIGN_OUT}
      refetchQueries={[{query: GET_USER_PROFILE}]}
    >
      {children}
    </Mutation>
  )
}

export const withSignOutMutation = withAuthMutation('signOut', SignOutMutation)
