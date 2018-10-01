import {Mutation} from 'react-apollo'

import {AK_SIGN_IN, STORE_CREDENTIALS} from '@/graphql/modules/user/mutations'

const withAuthMutation = (mutationName, Mutation) => (Target) => (props) => (
  <Mutation>
    {(mutate, state) => (
      <Target
        {...{
          ...props,
          [mutationName]: Object.assign(
            (variables = {}) => mutate({variables}),
            state
          )
        }}
      />
    )}
  </Mutation>
)
export function SignInMutation({children}) {
  return (
    <Mutation ignoreResults mutation={STORE_CREDENTIALS}>
      {(storeCredentials) => (
        <Mutation mutation={AK_SIGN_IN}>
          {(signIn, state) =>
            children(async (...args) => {
              const result = await signIn(...args)
              const {
                data: {accountKitSignIn}
              } = result
              if (accountKitSignIn)
                await storeCredentials({variables: accountKitSignIn})
              return result
            }, state)
          }
        </Mutation>
      )}
    </Mutation>
  )
}

export const withSignInMutation = withAuthMutation('signIn', SignInMutation)

export function SignOutMutation({children}) {
  return (
    <Mutation ignoreResults mutation={STORE_CREDENTIALS}>
      {(signOut, state) =>
        children(
          async () => signOut({variables: {jwt: null, user: null}}),
          state
        )
      }
    </Mutation>
  )
}

export const withSignOutMutation = withAuthMutation('signOut', SignOutMutation)
