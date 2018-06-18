import gql from 'graphql-tag'

export const EDIT_EMAIL = gql`
  mutation changeEmail($id: ID!, $email: String!) {
    changeEmail(id: $id, email: $email) {
      id
      email
    }
  }
`

export const EDIT_PASSWORD = gql`
  mutation changePassword(
    $id: ID!
    $newPassword: String!
    $currentPassword: String!
  ) {
    changePassword(
      id: $id
      newPassword: $newPassword
      currentPassword: $currentPassword
    ) {
      id
      email
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation editUserProfile($id: ID!, $name: String!, $phone: String!) {
    editUserProfile(id: $id, name: $name, phone: $phone) {
      id
      name
      phone
    }
  }
`
