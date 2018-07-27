import syncBlacklists from './resolvers/blacklist/sync'
import syncFavorites from './resolvers/favorites/sync'

export default async function syncCache() {
  return Promise.all([syncBlacklists(), syncFavorites()])
}
