import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const SEND_MESSAGE = gql`
  mutation sendMessage($listingId: ID!, $receiverId: ID!, $message: String) {
    listingUserMessages(
      listingId: $listingId
      receiverId: $receiverId
      message: $message
    ) {
      ...Message
    }
  }
  ${frag.User}
  ${frag.Message}
`
