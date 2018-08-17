import gql from 'graphql-tag'

export default gql`
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
    notificationPreferences {
      app
      email
    }
  }
`
