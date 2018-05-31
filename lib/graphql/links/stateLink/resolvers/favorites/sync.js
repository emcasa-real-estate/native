import {GET_FAVORITE_LISTINGS_IDS} from '@/lib/graphql/queries/favorites'
import {FAVORITE} from '@/lib/graphql/mutations/favorites'

const _GET_FAVORITE_LISTINGS_IDS = GET_FAVORITE_LISTINGS_IDS({cache: true})
const _FAVORITE = FAVORITE({cache: false})
const refetchQueries = [{query: GET_FAVORITE_LISTINGS_IDS({cache: false})}]

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
