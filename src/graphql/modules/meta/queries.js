import gql from 'graphql-tag'

const District = `
  city
  citySlug
  state
  stateSlug
  name
  nameSlug
  description
`

export const GET_ALL_DISTRICTS = gql`
  query districts {
    ${District}
  }
`

export const GET_DISTRICTS = gql`
  query district($nameSlug: String, $citySlug: String, $stateSlug: String) {
    district(nameSlug: $nameSlug, citySlug: $citySlug, stateSlug: $stateSlug) {
      ${District}
    }
  }
`
