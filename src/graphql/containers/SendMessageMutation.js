import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {MESSENGER_RECEIVER_ID} from '@/lib/config'
import {GET_MESSAGES} from '@/graphql/modules/messenger/queries'
import {SEND_MESSAGE} from '@/graphql/modules/messenger/mutations'
import {getUser} from '@/redux/modules/auth/selectors'

const SendMessageMutation = connect((state) => ({
  sender: getUser(state)
}))(function _SendMessageMutation({
  children,
  listing,
  receiver,
  sender,
  ...options
}) {
  return (
    <Mutation
      mutation={SEND_MESSAGE}
      refetchQueries={[
        {
          query: GET_MESSAGES,
          variables: {listingId: listing.id, senderId: sender.id}
        }
      ]}
      {...options}
    >
      {(mutate, ctx) =>
        children(
          ({variables}) =>
            mutate({
              variables: {
                listingId: listing.id,
                receiverId: receiver.id,
                ...variables
              }
            }),
          ctx
        )
      }
    </Mutation>
  )
})

SendMessageMutation.defaultProps = {
  receiver: {id: MESSENGER_RECEIVER_ID}
}

export const withSendMessageMutation = (getOptions) => (Target) => (props) => (
  <SendMessageMutation {...(getOptions ? getOptions(props) : {})}>
    {(sendMessage) => <Target {...props} sendMessage={sendMessage} />}
  </SendMessageMutation>
)
