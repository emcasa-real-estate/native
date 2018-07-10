import {Mutation} from 'react-apollo'

import {SEND_MESSAGE} from '@/graphql/modules/messenger/mutations'

function SendMessageMutation({children, listingId, senderId, ...options}) {
  return (
    <Mutation query={SEND_MESSAGE} {...options}>
      {(mutate, ctx) =>
        children(
          ({variables}) =>
            mutate({variables: {listingId, senderId, ...variables}}),
          ctx
        )
      }
    </Mutation>
  )
}

export const withSendMessageMutation = (getOptions) => (Target) => (props) => (
  <SendMessageMutation {...(getOptions ? getOptions(props) : {})}>
    {(sendMessage) => <Target {...props} sendMessage={sendMessage} />}
  </SendMessageMutation>
)
