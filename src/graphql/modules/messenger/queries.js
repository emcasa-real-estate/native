import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_MESSAGES = gql`
  query listingUserMessages($listingId: ID!, $senderId: ID!) {
    listingUserMessages(listingId: $listingId, senderId: $senderId) {
      user {
        ...User
      }
      messages {
        ...Message
      }
    }
  }
  ${frag.User}
  ${frag.Message}
`

export const GET_MESSAGE_CHANNELS = gql`
  query userMessageChannels {
    userChannels {
      id
      listing {
        id
      }
      lastMessage {
        ...Message
      }
      participant1 {
        ...User
      }
      participant2 {
        ...User
      }
    }
  }
  ${frag.User}
  ${frag.Message}
`
