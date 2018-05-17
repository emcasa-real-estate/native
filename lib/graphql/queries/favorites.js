import gql from 'graphql-tag'

export const GET_FAVORITE_LISTINGS_IDS = ({cache}) => gql`
  {
    favoritedListings ${cache === true ? '@client' : ''} {
      id
    }
  }
`

export const GET_FAVORITE_LISTINGS = ({cache}) => gql`
  {
    favoritedListings ${cache === true ? '@client' : ''} {
      id
      price
      matterportCode
      area
      isActive
      bathrooms
      garageSpots
      hasElevator
      propertyTax
      maintenanceFee
      description
      floor
      rooms
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
