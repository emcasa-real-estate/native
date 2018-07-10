import gql from 'graphql-tag'

export {default as ListingInput} from './ListingInput'

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

Address.parse = (address) => ({
  ...address,
  __typename: 'Address'
})

export const UserAddress = gql`
  fragment UserAddress on Address {
    ...Address
    streetNumber
  }
  ${Address}
`

export const Image = gql`
  fragment Image on Image {
    position
    filename
    description
    isActive
  }
`

Image.parse = (image) => ({
  ...image,
  __typename: 'Image'
})

export const Listing = gql`
  fragment Listing on Listing {
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
    maintenanceFee
    propertyTax
    matterportCode
    description
    images {
      ...Image
    }
    address {
      ...Address
    }
  }
  ${Image}
  ${Address}
`

Listing.parse = ({address, images, ...listing}) => ({
  ...listing,
  __typename: 'Listing',
  address: Address.parse(address),
  images: images.map(Image.parse)
})

export const ListingFeed = gql`
  fragment ListingFeed on Listing {
    id
    price
    isExclusive
    isRelease
    isActive
    description
    images(isActive: true) {
      position
      filename
    }
    address {
      ...Address
    }
  }
  ${Address}
`

export const UserListing = gql`
  fragment UserListing on Listing {
    ...Listing
    complement
    inPersonVisitCount
    interestCount
    listingFavoriteCount
    listingVisualisationCount
    tourVisualisationCount
    images {
      position
      filename
    }
    address {
      ...UserAddress
    }
  }
  ${Listing}
  ${UserAddress}
`
