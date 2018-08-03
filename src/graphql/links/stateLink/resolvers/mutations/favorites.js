import _ from 'lodash'
import {AsyncStorage} from 'react-native'
import * as frag from '@/graphql/fragments'

export const FAVORITES_CACHE_KEY = '__emcasa_favorite_listings'

export const getFavorites = async () => {
  const json = await AsyncStorage.getItem(FAVORITES_CACHE_KEY)
  if (!json) return []
  return JSON.parse(json)
}

export const setFavorites = async (listings) => {
  await AsyncStorage.setItem(
    FAVORITES_CACHE_KEY,
    JSON.stringify(_.uniqBy(listings, 'id'))
  )
}

export const resetFavorites = () => AsyncStorage.removeItem(FAVORITES_CACHE_KEY)

export async function favoriteListing(_, {id}, {cache}) {
  const listing = await cache.readFragment({
    fragment: frag.ListingFeed,
    fragmentName: 'ListingFeed',
    id: `Listing:${id}`
  })
  if (!listing) return
  await setFavorites((await getFavorites()).concat(listing))
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}

export async function unfavoriteListing(_, {id}) {
  await setFavorites(
    (await getFavorites()).filter((data) => String(data.id) !== String(id))
  )
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}
