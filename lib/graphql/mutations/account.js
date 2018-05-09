import gql from 'graphql-tag'

export const EDIT_EMAIL = gql`
  mutation editUserEmail($id: ID!, $email: String!) {
    changeEmail(id: $id, email: $email) {
      user {
        id
        email
      }
    }
  }
`

export const EDIT_PASSWORD = gql`
  mutation editUserPassword(
    $id: ID!
    $newPassword: String!
    $currentPassword: String!
  ) {
    changePassword(
      id: $id
      newPassword: $newPassword
      currentPassword: $currentPassword
    ) {
      user {
        id
        email
      }
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation editUserProfile($id: ID!, $name: String!, $phone: String!) {
    editUserProfile(id: $id, name: $name, phone: $phone) {
      user {
        id
        name
        phone
      }
    }
  }
`
