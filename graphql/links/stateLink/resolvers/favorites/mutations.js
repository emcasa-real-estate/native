import {reportError} from '@/redux/modules/fabric'
import {getData} from '@/redux/modules/listings/data/selectors'
import {GET_FAVORITE_LISTINGS} from '@/graphql/modules/user/queries'

const parseListing = (data) => ({
  ...data,
  __typename: 'Listing',
  address: {
    ...data.address,
    __typename: 'Address'
  },
  images: data.images.map((image) => ({
    ...image,
    __typename: 'Image'
  }))
})

const logSchemaError = (error, redux) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(error)
  else redux.dispatch(reportError(error))
}

export async function favoriteListing(_, {id}, {cache, redux}) {
  const listingData = getData(redux.state, {id})
  if (!listingData) return null
  const listing = parseListing(listingData)
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
