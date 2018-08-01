import {AsyncStorage} from 'react-native'
import * as frag from '@/graphql/fragments'

export const BLACKLIST_CACHE_KEY = '__emcasa_blacklisted_listings'

export const getBlacklist = async () => {
  const json = await AsyncStorage.getItem(BLACKLIST_CACHE_KEY)
  if (!json) return []
  return JSON.parse(json)
}

export const setBlacklist = async (listings) => {
  await AsyncStorage.setItem(BLACKLIST_CACHE_KEY, JSON.stringify(listings))
}

export async function listingBlacklist(_, {id}, {cache}) {
  const listing = await cache.readFragment({
    fragment: frag.ListingFeed,
    fragmentName: 'ListingFeed',
    id: `Listing:${id}`
  })
  if (!listing) return
  await setBlacklist((await getBlacklist()).concat(listing))
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}

export async function listingUnblacklist(_, {id}) {
  await setBlacklist(
    (await getBlacklist()).filter((data) => String(data.id) !== String(id))
  )
  return {
    __typename: 'ListingUser',
    listing: {id, __typename: 'Listing'},
    user: null
  }
}
