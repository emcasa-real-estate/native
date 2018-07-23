import gql from 'graphql-tag'

import User from './User'
import Message from './Message'
import Image from './Image'
import Address from './Address'

export default gql`
  fragment Channel on Channel {
    id
    unreadCount
    listing {
      id
      type
      price
      images(isActive: true, limit: 1) {
        ...Image
      }
      address {
        ...Address
      }
    }
    participant1 {
      ...User
    }
    participant2 {
      ...User
    }
    messages {
      ...Message
    }
  }
  ${User}
  ${Message}
  ${Address}
  ${Image}
`
