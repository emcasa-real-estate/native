import {Query} from 'react-apollo'

import {GET_LISTING} from '@/graphql/modules/listings/queries'

function ListingQuery({children, id, ...options}) {
  return (
    <Query query={GET_LISTING} variables={{id}} {...options}>
      {children}
    </Query>
  )
}

export const withListing = (getOptions) => (Target) => (props) => (
  <ListingQuery {...(getOptions ? getOptions(props) : {})}>
    {({data, ...response}) => (
      <Target
        {...props}
        listing={{
          loading: response.loading,
          data: data ? data.listing : undefined,
          refetch: response.refetch
        }}
      />
    )}
  </ListingQuery>
)
