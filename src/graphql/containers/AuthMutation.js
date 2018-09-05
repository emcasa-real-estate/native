import {Mutation} from 'react-apollo'

import {
  AK_SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  STORE_CREDENTIALS
} from '@/graphql/modules/user/mutations'
import {GET_CREDENTIALS, GET_USER_PROFILE} from '@/graphql/modules/user/queries'

const withAuthMutation = (mutationName, Mutation) => (Target) => (props) => (
  <Mutation>
    {(mutate) => <Target {...{...props, [mutationName]: mutate}} />}
  </Mutation>
)

export function SignInMutation({children, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={AK_SIGN_IN}
      refetchQueries={[{query: GET_USER_PROFILE}, {query: GET_CREDENTIALS}]}
      update={(cache, {accountKitSignIn}) => {
        cache.writeQuery({
          query: STORE_CREDENTIALS,
          variables: accountKitSignIn
        })
      }}
    >
      {(mutate, props) => children(({variables}) => mutate({variables}), props)}
    </Mutation>
  )
}

export const withSignInMutation = withAuthMutation('signIn', SignInMutation)

export function SignUpMutation({children, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={SIGN_UP}
      refetchQueries={[{query: GET_USER_PROFILE}, {query: GET_CREDENTIALS}]}
      update={(cache, {accountKitSignIn}) => {
        cache.writeQuery({
          query: STORE_CREDENTIALS,
          variables: accountKitSignIn
        })
      }}
    >
      {(mutate, props) => children(({variables}) => mutate({variables}), props)}
    </Mutation>
  )
}

export const withSignUpMutation = withAuthMutation('signUp', SignUpMutation)

export function SignOutMutation({children, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={SIGN_OUT}
      refetchQueries={[{query: GET_USER_PROFILE}, {query: GET_CREDENTIALS}]}
    >
      {(mutate, props) => children(({variables}) => mutate({variables}), props)}
    </Mutation>
  )
}

export const withSignOutMutation = withAuthMutation('signOut', SignOutMutation)
