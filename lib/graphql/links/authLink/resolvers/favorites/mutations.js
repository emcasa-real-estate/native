import {getData} from '@/redux/modules/listings/data/selectors'
import {GET_FAVORITED_LISTINGS} from './schema'

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
    const {favoritedListings} = cache.readQuery({query: GET_FAVORITED_LISTINGS})
    cache.writeData({
      data: {
        favoritedListings: favoritedListings.concat(listing)
      }
    })
  } catch (error) {
    return null
  }
  return {__typename: 'ListingUser', listing, user: null}
}

export async function unfavoriteListing(_, {id}, {cache, redux}) {
  const listingData = getData(redux.state, {id})
  if (!listingData) return null
  const listing = parseListing(listingData)
  try {
    const {favoritedListings} = cache.readQuery({query: GET_FAVORITED_LISTINGS})
    const data = {
      favoritedListings: favoritedListings.filter(
        (data) => String(data.id) !== String(id)
      )
    }
    cache.writeData({data})
  } catch (error) {
    return null
  }
  return {__typename: 'ListingUser', listing, user: null}
}
