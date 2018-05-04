import gql from 'graphql-tag'

export const FAVORITE = ({cache}) => gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) ${cache ? '@client' : ''} {
      listing {
        id
      }
    }
  }
`

export const UNFAVORITE = ({cache}) => gql`
  mutation unfavoriteListing($id: ID!) {
    unfavoriteListing(id: $id) ${cache ? '@client' : ''} {
      listing {
        id
      }
    }
  }
`
