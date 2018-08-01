import _ from 'lodash'
import {Query} from 'react-apollo'
import {connect} from 'react-redux'
import {compose, mapProps} from 'recompose'

import {
  GET_BLACKLISTED_LISTINGS_IDS,
  GET_BLACKLISTED_LISTINGS
} from '@/graphql/modules/user/queries'
import {getToken} from '@/redux/modules/auth/selectors'

const props = (state) => ({jwt: getToken(state)})

const BlacklistQuery = connect(props)(({children, jwt, query}) => {
  const options = {cache: !jwt}
  return (
    <Query
      query={query(options)}
      // fetchPolicy={jwt ? 'cache-and-network' : 'cache-first'}
    >
      {children}
    </Query>
  )
})

export default BlacklistQuery

const createBlacklistContainer = (query, getProps) => (Target) => (props) => (
  <BlacklistQuery query={query}>
    {(response) => <Target {...props} {...getProps(response)} />}
  </BlacklistQuery>
)

export const withBlacklistedListings = createBlacklistContainer(
  GET_BLACKLISTED_LISTINGS,
  (response) => ({
    blacklist: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.blacklists
        : [],
      loading: response.loading
    }
  })
)

export const withBlacklistedListingIDs = createBlacklistContainer(
  GET_BLACKLISTED_LISTINGS_IDS,
  (response) => ({
    blacklist: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.blacklists
        : [],
      loading: response.loading
    }
  })
)

export const withBlacklistedListingByID = compose(
  withBlacklistedListingIDs,
  mapProps(({blacklist, ...props}) => ({
    ...props,
    blacklisted:
      blacklist.data &&
      blacklist.data.findIndex((fav) => fav.id == props.id) !== -1
  }))
)
