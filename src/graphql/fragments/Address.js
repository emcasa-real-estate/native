import gql from 'graphql-tag'

export default Object.assign(
  gql`
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
  `,
  {
    parse: (address) => ({
      ...address,
      __typename: 'Address'
    })
  }
)
