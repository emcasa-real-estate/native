import gql from 'graphql-tag'

export default {
  favoritedListings: []
}

export const GET_FAVORITED_LISTINGS = gql`
  query FavoritedListings {
    favoritedListings @client {
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
        streetNumber
      }
    }
  }
`
