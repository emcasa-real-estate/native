import Card from '@/components/listings/Card/Listing'
import FavoritesMutation from '@/graphql/modules/listings/containers/FavoritesMutation'
import {withFavoriteListingByID} from '@/graphql/modules/listings/containers'

function ListingCardApp(props) {
  return (
    <FavoritesMutation {...props}>
      {(onFavorite) => <Card {...props} onFavorite={() => onFavorite()} />}
    </FavoritesMutation>
  )
}

export default withFavoriteListingByID(ListingCardApp)
