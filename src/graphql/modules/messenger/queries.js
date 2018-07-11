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

export const GET_CHANNEL_FEED = gql`
  query userChannels {
    userChannels {
      ...Channel
    }
  }
  ${frag.Channel}
`
