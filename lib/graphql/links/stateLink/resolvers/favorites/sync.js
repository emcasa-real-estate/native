import {GET_FAVORITE_LISTINGS_IDS} from '@/lib/graphql/queries/favorites'
import {FAVORITE} from '@/lib/graphql/mutations/favorites'

const _GET_FAVORITE_LISTINGS_IDS = GET_FAVORITE_LISTINGS_IDS({client: true})
const _FAVORITE = FAVORITE({client: false})
const refetchQueries = [{query: GET_FAVORITE_LISTINGS_IDS({client: false})}]

export default async function sync(proxy) {
  const {data} = await proxy.query({query: _GET_FAVORITE_LISTINGS_IDS})
  data.favoritedListings.map((fav) =>
    proxy.mutate({
      mutation: _FAVORITE,
      variables: {id: fav.id},
      refetchQueries
    })
  )
}
