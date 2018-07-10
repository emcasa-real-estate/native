import {Mutation} from 'react-apollo'

import {MESSENGER_RECEIVER_ID} from '@/lib/config'
import {SEND_MESSAGE} from '@/graphql/modules/messenger/mutations'

function SendMessageMutation({children, listingId, receiverId, ...options}) {
  return (
    <Mutation mutation={SEND_MESSAGE} {...options}>
      {(mutate, ctx) =>
        children(
          ({variables}) =>
            mutate({variables: {listingId, receiverId, ...variables}}),
          ctx
        )
      }
    </Mutation>
  )
}

SendMessageMutation.defaultProps = {
  receiverId: MESSENGER_RECEIVER_ID
}

export const withSendMessageMutation = (getOptions) => (Target) => (props) => (
  <SendMessageMutation {...(getOptions ? getOptions(props) : {})}>
    {(sendMessage) => <Target {...props} sendMessage={sendMessage} />}
  </SendMessageMutation>
)
