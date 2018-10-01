import {
  GET_BLACKLISTED_LISTINGS_IDS,
  GET_FAVORITE_LISTINGS_IDS
} from '@/graphql/modules/user/queries'
import {BLACKLIST, FAVORITE} from '@/graphql/modules/listings/mutations'
import {resetBlacklist} from './resolvers/mutations/blacklist'
import {resetFavorites} from './resolvers/mutations/favorites'

async function syncBlacklist(proxy) {
  await resetBlacklist()
  const {data} = await proxy.query({
    query: GET_BLACKLISTED_LISTINGS_IDS,
    fetchPolicy: 'cache-only'
  })
  const ops = data.userProfile.blacklists.map((listing) =>
    proxy.mutate({
      mutation: BLACKLIST({cache: false}),
      variables: {id: listing.id},
      refetchQueries: [{query: GET_BLACKLISTED_LISTINGS_IDS}]
    })
  )
  return Promise.all(ops)
}

async function syncFavorites(proxy) {
  await resetFavorites()
  const {data} = await proxy.query({
    query: GET_FAVORITE_LISTINGS_IDS,
    fetchPolicy: 'cache-only'
  })
  const ops = data.userProfile.favorites.map((listing) =>
    proxy.mutate({
      mutation: FAVORITE({cache: false}),
      variables: {id: listing.id},
      refetchQueries: [{query: GET_FAVORITE_LISTINGS_IDS}]
    })
  )
  return Promise.all(ops)
}

export default function sync(proxy) {
  return Promise.all([syncBlacklist(proxy), syncFavorites(proxy)])
}
