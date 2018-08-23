import gql from 'graphql-tag'
import {ListingFeed} from './Listing'

const User = gql`
  fragment User on User {
    id
    name
    email
    phone
  }
`

export const UserProfile = gql`
  fragment UserProfile on User {
    id
    name
    email
    phone
    role
  }
`

export default User

export const UserProfile = gql`
  fragment UserProfile on User {
    ...User
    favorites {
      ...ListingFeed
    }
    listings {
      ...ListingFeed
    }
  }
  ${User}
  ${ListingFeed}
`
