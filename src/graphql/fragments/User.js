import gql from 'graphql-tag'

export default gql`
  fragment User on User {
    id
    email
    phone
    role
    notificationPreferences {
      app
      email
    }
  }
`
