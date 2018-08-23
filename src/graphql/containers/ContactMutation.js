import {Mutation} from 'react-apollo'

import {REQUEST_CONTACT} from '@/graphql/modules/contact/mutations'

export default function RequestContactMutation({children, ...options}) {
  return (
    <Mutation mutation={REQUEST_CONTACT} {...options}>
      {(mutate, ctx) => children((variables) => mutate({variables}), ctx)}
    </Mutation>
  )
}

export const withRequestContactMutation = (getOptions) => (Target) => (
  props
) => (
  <RequestContactMutation {...(getOptions ? getOptions(props) : {})}>
    {(requestContact, ctx) => (
      <Target {...props} {...ctx} requestContact={requestContact} />
    )}
  </RequestContactMutation>
)
