import gql from 'graphql-tag'

export const GET_USER_LISTINGS = gql`
  {
    userListings {
      id
      price
      isActive
      description
      images {
        filename
      }
      address {
        city
        lat
        lng
        neighborhood
        postalCode
        state
        street
      }
    }
  }
`
