import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_ALL_DISTRICTS = gql`
  query districts {
    ...District
  }
  ${frag.District}
`

export const GET_DISTRICTS = gql`
  query district($nameSlug: String, $citySlug: String, $stateSlug: String) {
    district(nameSlug: $nameSlug, citySlug: $citySlug, stateSlug: $stateSlug) {
      ...District
    }
  }
  ${frag.District}
`
