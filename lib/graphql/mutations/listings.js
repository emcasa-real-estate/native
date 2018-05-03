import gql from 'graphql-tag'

export const FAVORITE = ({queue}) => gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) ${queue ? '@client' : ''} {
      listing {
        id
      }
    }
  }
`

export const UNFAVORITE = ({queue}) => gql`
  mutation unfavoriteListing($id: ID!) {
    unfavoriteListing(id: $id) ${queue ? '@client' : ''} {
      listing {
        id
      }
    }
  }
`

export const VISUALIZE_TOUR = gql`
  mutation tourVisualized($id: ID!) {
    tourVisualized(id: $id) {
      id
    }
  }
`
