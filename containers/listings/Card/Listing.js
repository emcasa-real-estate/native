import Card from '@/components/listings/Card/Listing'
import FavoritesMutation from '@/containers/listings/FavoritesMutation'
import {withGqlData} from '@/containers/listings/Listing/Loader'

function ListingCardApp(props) {
  return (
    <FavoritesMutation {...props}>
      {(onFavorite) => <Card {...props} onFavorite={() => onFavorite()} />}
    </FavoritesMutation>
  )
}

export default withGqlData(ListingCardApp)
