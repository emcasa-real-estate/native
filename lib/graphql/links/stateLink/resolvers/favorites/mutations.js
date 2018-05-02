import {getData} from '@/redux/modules/listings/data/selectors'
import {GET_FAVORITED_LISTINGS} from './schema'

export async function favoriteListing(_, {id}, {cache, redux}) {
  const listing = getData(redux.state, {id})
  if (!listing) return null
  const {favoritedListings} = cache.readQuery({query: GET_FAVORITED_LISTINGS})
  cache.writeData({
    favoritedListings: [
      ...favoritedListings,
      {
        __typename: 'Listing',
        ...listing
      }
    ]
  })
  return {listing, user: null}
}

export async function unfavoriteListing(_, {id}, {cache, redux}) {
  const listing = getData(redux.state, {id})
  const {favoritedListings} = cache.readQuery({query: GET_FAVORITED_LISTINGS})
  cache.writeData({
    favoritedListings: favoritedListings.filter(
      (data) => String(data.id) !== String(id)
    )
  })
  return {listing, user: null}
}
