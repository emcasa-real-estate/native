import gql from 'graphql-tag'

import User from './User'
import Message from './Message'

export default gql`
  fragment Channel on Channel {
    id
    unreadCount
    listing {
      id
    }
    participant1 {
      ...User
    }
    participant2 {
      ...User
    }
    lastMessage {
      ...Message
    }
  }
  ${User}
  ${Message}
`
