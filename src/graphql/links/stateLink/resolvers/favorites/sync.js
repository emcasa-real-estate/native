import {GET_FAVORITE_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {FAVORITE} from '@/graphql/modules/listings/mutations'

const _GET_FAVORITE_LISTINGS_IDS = GET_FAVORITE_LISTINGS_IDS({cache: true})
const _FAVORITE = FAVORITE({cache: false})
const refetchQueries = [{query: GET_FAVORITE_LISTINGS_IDS({cache: false})}]

export default async function sync(proxy) {
  const {data} = await proxy.query({query: _GET_FAVORITE_LISTINGS_IDS})
  data.userProfile.favorites.map((fav) =>
    proxy.mutate({
      mutation: _FAVORITE,
      variables: {id: fav.id},
      refetchQueries
    })
  )
}
