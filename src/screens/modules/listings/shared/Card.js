import Card from '@/components/listings/Card/Listing'
import FavoritesMutation from '@/graphql/containers/FavoritesMutation'
import {withFavoriteListingByID} from '@/graphql/containers'

function ListingCardApp(props) {
  return (
    <FavoritesMutation {...props}>
      {(onFavorite) => <Card {...props} onFavorite={() => onFavorite()} />}
    </FavoritesMutation>
  )
}

export default withFavoriteListingByID(ListingCardApp)
