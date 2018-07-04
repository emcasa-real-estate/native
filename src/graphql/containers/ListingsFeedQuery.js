import _ from 'lodash/fp'
import {Query} from 'react-apollo'

import {GET_LISTINGS_FEED} from '@/graphql/modules/listings/queries'

const getIDs = _.map(_.get('id'))

function ListingsFeedQuery({filters, pageSize, children, fetchPolicy}) {
  return (
    <Query
      key={JSON.stringify(filters)}
      query={GET_LISTINGS_FEED}
      fetchPolicy={fetchPolicy}
      variables={{filters, pageSize}}
    >
      {({fetchMore, data = {}, ...response}) =>
        children({
          ...response,
          data,
          fetchMore: () =>
            fetchMore({
              variables: {
                filters,
                pageSize,
                exclude: data.listings ? getIDs(data.listings.listings) : []
              },
              updateQuery: (prev, {fetchMoreResult}) => ({
                listings: {
                  __typename: prev.listings.__typename,
                  listings: [
                    ...prev.listings.listings,
                    ...fetchMoreResult.listings.listings
                  ],
                  remainingCount: fetchMoreResult.listings.remainingCount
                }
              })
            })
        })
      }
    </Query>
  )
}

ListingsFeedQuery.defaultProps = {
  filters: {}
}

export const withListingsFeed = (options = {}) => (Target) => (props) => (
  <ListingsFeedQuery {...props} {...options}>
    {({data: {listings}, ...response}) => (
      <Target
        {...props}
        listingsFeed={{
          loading: response.loading,
          data: listings ? listings.listings : [],
          remainingCount: listings ? listings.remainingCount : undefined,
          refetch: response.refetch,
          fetchMore: response.fetchMore
        }}
      />
    )}
  </ListingsFeedQuery>
)
