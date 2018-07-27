import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {BLACKLIST} from '@/graphql/modules/listings/mutations'

const _GET_FAVORITE_LISTINGS_IDS = GET_BLACKLISTED_LISTINGS_IDS({cache: true})
const _BLACKLIST = BLACKLIST({cache: false})
const refetchQueries = [{query: GET_BLACKLISTED_LISTINGS_IDS({cache: false})}]

export default async function sync(proxy) {
  const {data} = await proxy.query({query: _GET_FAVORITE_LISTINGS_IDS})
  data.userProfile.blacklists.map((listing) =>
    proxy.mutate({
      mutation: _BLACKLIST,
      variables: {id: listing.id},
      refetchQueries
    })
  )
}
