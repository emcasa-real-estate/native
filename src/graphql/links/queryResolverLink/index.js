import update from 'immutability-helper'
import {withQueryResolver} from './Link'

import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'

export default ({cache}) =>
  withQueryResolver({
    listingsFeed(data) {
      const {blacklistedListings} = cache.readQuery({
        query: GET_BLACKLISTED_LISTINGS_IDS({cache: true})
      })
      if (!blacklistedListings.length) return data
      const blacklistedIds = blacklistedListings.map(({id}) => id)
      const next = update(data, {
        listings: {
          listings: {
            $apply: (listings) =>
              listings.filter((listing) => !blacklistedIds.includes(listing.id))
          }
        }
      })
      return next
    }
  })
