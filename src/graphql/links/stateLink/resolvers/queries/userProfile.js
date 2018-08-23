import {getFavorites} from '../mutations/favorites'
import {getBlacklist} from '../mutations/blacklist'

export default async function userProfile(prev = {}) {
  return {
    ...prev,
    __typename: 'User',
    id: '0',
    favorites: await getFavorites(),
    blacklists: await getBlacklist()
  }
}
