import gql from 'graphql-tag'

import User from './User'

export default gql`
  fragment Message on Message {
    id
    insertedAt
    message
    notified
    read
    listing {
      id
    }
    receiver {
      ...User
    }
    sender {
      ...User
    }
  }
  ${User}
`
