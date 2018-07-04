import gql from 'graphql-tag'

export const GET_LISTINGS_FEED = gql`
  query listingsFeed(
    $exclude: [ID!]
    $pageSize: Int
    $filters: ListingFilter!
  ) {
    listings(
      filters: $filters
      pagination: {excludedListingIds: $exclude, pageSize: $pageSize}
    ) {
      remainingCount
      listings {
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
  }
`
