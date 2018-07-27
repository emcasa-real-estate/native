import update from 'immutability-helper'
import {reportError} from '@/redux/modules/firebase/crashlytics'
import * as frag from '@/graphql/fragments'
import {GET_BLACKLISTED_LISTINGS} from '@/graphql/modules/user/queries'

const logSchemaError = (error, redux) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(error)
  else redux.dispatch(reportError(error))
}

export async function listingBlacklist(_, {id}, {cache, redux}) {
  const listing = await cache.readFragment({
    fragment: frag.ListingFeed,
    fragmentName: 'ListingFeed',
    id: `Listing:${id}`
  })
  if (!listing) return
  try {
    const query = GET_BLACKLISTED_LISTINGS({cache: true})
    const data = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: update(data, {
        userProfile: {blacklists: {$push: [listing]}}
      })
    })
  } catch (error) {
    logSchemaError(error, redux)
    return null
  }
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}

export async function listingUnblacklist(_, {id}, {cache, redux}) {
  try {
    const query = GET_BLACKLISTED_LISTINGS({cache: true})
    const data = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: update(data, {
        userProfile: {
          blacklists: {
            $apply: (listings) =>
              listings.filter((data) => String(data.id) !== String(id))
          }
        }
      })
    })
  } catch (error) {
    logSchemaError(error, redux)
    return null
  }
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}
