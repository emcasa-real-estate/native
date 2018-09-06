import update from 'immutability-helper'
import {withQueryResolver} from './Link'

import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'

export default ({cache}) =>
  withQueryResolver({
    // Removes client-side blacklisted listings from feed
    listingsFeed(data, op) {
      if (op.getContext().authenticated) return data
      try {
        const {
          userProfile: {blacklists}
        } = cache.readQuery({
          query: GET_BLACKLISTED_LISTINGS_IDS({cache: true})
        })
        if (!blacklists.length) return data
        const blacklistedIds = blacklists.map(({id}) => id)
        const next = update(data, {
          listings: {
            listings: {
              $apply: (listings) =>
                listings.filter(
                  (listing) => !blacklistedIds.includes(listing.id)
                )
            }
          }
        })
        return next
      } catch (err) {
        return data
      }
    }
  })
