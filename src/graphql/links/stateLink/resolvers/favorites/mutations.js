import {reportError} from '@/redux/modules/firebase/crashlytics'
import * as frag from '@/graphql/fragments'
import {GET_FAVORITE_LISTINGS} from '@/graphql/modules/user/queries'

const logSchemaError = (error, redux) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(error)
  else redux.dispatch(reportError(error))
}

export async function favoriteListing(_, {id}, {cache, redux}) {
  const listing = await cache.readFragment({
    fragment: frag.Listing,
    fragmentName: 'Listing',
    id: `Listing:${id}`
  })
  if (!listing) return
  try {
    const query = GET_FAVORITE_LISTINGS({cache: true})
    const {favoritedListings} = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: {
        favoritedListings: favoritedListings.concat(listing)
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

export async function unfavoriteListing(_, {id}, {cache, redux}) {
  try {
    const query = GET_FAVORITE_LISTINGS({cache: true})
    const {favoritedListings} = cache.readQuery({query})
    cache.writeQuery({
      query,
      data: {
        favoritedListings: favoritedListings.filter(
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
