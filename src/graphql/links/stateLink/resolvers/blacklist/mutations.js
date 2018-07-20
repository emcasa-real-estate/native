import {reportError} from '@/redux/modules/firebase/crashlytics'
import * as frag from '@/graphql/fragments'
import {GET_BLACKLISTED_LISTINGS} from '@/graphql/modules/user/queries'

const logSchemaError = (error, redux) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(error)
  else redux.dispatch(reportError(error))
}

export async function blacklistListing(_, {id}, {cache, redux}) {
  const listing = await cache.readFragment({
    fragment: frag.ListingFeed,
    fragmentName: 'ListingFeed',
    id: `Listing:${id}`
  })
  if (!listing) return
  try {
    const query = GET_BLACKLISTED_LISTINGS({cache: true})
    const {blacklistedListings} = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: {
        blacklistedListings: blacklistedListings.concat(listing)
      }
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

export async function whitelistListing(_, {id}, {cache, redux}) {
  try {
    const query = GET_BLACKLISTED_LISTINGS({cache: true})
    const {blacklistedListings} = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: {
        blacklistedListings: blacklistedListings.filter(
          (data) => String(data.id) !== String(id)
        )
      }
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
