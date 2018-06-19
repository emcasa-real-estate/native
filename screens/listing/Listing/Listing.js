import FavoritesMutation from '@/graphql/modules/listings/containers/FavoritesMutation'
import {withFavoriteListingByID} from '@/graphql/modules/listings/containers'
import Listing from '@/components/listings/Listing'

function ListingApp({viewTour, ...props}) {
  return (
    <FavoritesMutation id={props.id} favorite={props.favorite}>
      {(favoriteListing) => (
        <Listing
          onViewTour={() => viewTour()}
          onFavorite={() => favoriteListing()}
          {...props}
        />
      )}
    </FavoritesMutation>
  )
}

export default withFavoriteListingByID(ListingApp)
