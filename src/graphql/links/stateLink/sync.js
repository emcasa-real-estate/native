import {
  GET_BLACKLISTED_LISTINGS_IDS,
  GET_FAVORITE_LISTINGS_IDS
} from '@/graphql/modules/user/queries'
import {BLACKLIST, FAVORITE} from '@/graphql/modules/listings/mutations'

async function syncBlacklist(proxy) {
  const {data} = await proxy.query({
    query: GET_BLACKLISTED_LISTINGS_IDS({cache: true})
  })
  const ops = data.userProfile.blacklists.map((listing) =>
    proxy.mutate({
      mutation: BLACKLIST({cache: false}),
      variables: {id: listing.id},
      refetchQueries: [{query: GET_BLACKLISTED_LISTINGS_IDS({cache: false})}]
    })
  )
  return Promise.all(ops)
}

async function syncFavorites(proxy) {
  const {data} = await proxy.query({
    query: GET_FAVORITE_LISTINGS_IDS({cache: true})
  })
  const ops = data.userProfile.blacklists.map((listing) =>
    proxy.mutate({
      mutation: FAVORITE({cache: false}),
      variables: {id: listing.id},
      refetchQueries: [{query: GET_FAVORITE_LISTINGS_IDS({cache: false})}]
    })
  )
  return Promise.all(ops)
}

export default function sync(proxy) {
  return Promise.all([syncBlacklist(proxy), syncFavorites(proxy)])
}
