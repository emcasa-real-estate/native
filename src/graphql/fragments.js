import gql from 'graphql-tag'

export const Address = gql`
  fragment Address on Address {
    lat
    lng
    postalCode
    city
    citySlug
    neighborhood
    neighborhoodSlug
    state
    stateSlug
    street
    streetSlug
  }
`

export const FullListing = gql`
  fragment FullListing on Listing {
    id
    type
    price
    area
    balconies
    rooms
    restrooms
    suites
    dependencies
    floor
    garageSpots
    hasElevator
    isExclusive
    isRelease
    isActive
    inPersonVisitCount
    interestCount
    listingFavoriteCount
    listingVisualisationCount
    tourVisualisationCount
    maintenanceFee
    propertyTax
    matterportCode
    description
    complement
    images {
      position
      filename
      description
      isActive
    }
    address {
      ...Address
    }
  }
  ${Address}
`

export const Listing = gql`
  fragment Listing on Listing {
    id
    price
    isActive
    description
    images(isActive: true) {
      filename
    }
    address {
      ...Address
    }
  }
  ${Address}
`
