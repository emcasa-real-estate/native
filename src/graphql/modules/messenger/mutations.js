import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const SEND_MESSAGE = gql`
  mutation sendMessage($listingId: ID!, $receiverId: ID!, $message: String!) {
    sendMessage(
      listingId: $listingId
      receiverId: $receiverId
      message: $message
    ) {
      ...Message
    }
  }
  ${frag.Message}
`

export const MARK_AS_READ = gql`
  mutation markAsRead($id: ID!) {
    markAsRead(id: $id) {
      ...Message
    }
  }
  ${frag.Message}
`
