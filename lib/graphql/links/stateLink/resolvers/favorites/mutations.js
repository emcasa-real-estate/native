import {getData} from '@/redux/modules/listings/data/selectors'
import {GET_FAVORITE_LISTINGS} from '@/lib/graphql/queries/favorites'

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
    console.warn(error) // eslint-disable-line no-console
    return null
  }
  return {__typename: 'ListingUser', listing, user: null}
}

export async function unfavoriteListing(_, {id}, {cache, redux}) {
  const listingData = getData(redux.state, {id})
  if (!listingData) return null
  const listing = parseListing(listingData)
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
    console.warn(error) // eslint-disable-line no-console
    return null
  }
  return {__typename: 'ListingUser', listing, user: null}
}
