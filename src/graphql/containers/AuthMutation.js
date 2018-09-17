import {Mutation} from 'react-apollo'

import {
  AK_SIGN_IN,
  SIGN_OUT,
  STORE_CREDENTIALS
} from '@/graphql/modules/user/mutations'
import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'

const withAuthMutation = (mutationName, Mutation) => (Target) => (props) => (
  <Mutation>
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
)
export function SignInMutation({children, ...props}) {
  return (
    <Mutation
      mutation={STORE_CREDENTIALS}
      refetchQueries={[{query: GET_USER_PROFILE}]}
    >
      {(storeCredentials) => (
        <Mutation {...props} mutation={AK_SIGN_IN}>
          {(signIn, state) =>
            children(async (...args) => {
              const result = await signIn(...args)
              const {
                data: {accountKitSignIn}
              } = result
              if (accountKitSignIn) await storeCredentials(accountKitSignIn)
              return result
            }, state)
          }
        </Mutation>
      )}
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
