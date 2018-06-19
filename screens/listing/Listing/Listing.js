import _ from 'lodash'
import {compose, mapProps} from 'recompose'

import FavoritesMutation from '@/graphql/modules/listings/containers/FavoritesMutation'
import {
  withFavoriteListingByID,
  withViewTourMutation
} from '@/graphql/modules/listings/containers'
import Listing from '@/components/listings/Listing'

function ListingApp({viewTour, onOpenTour, ...props}) {
  return (
    <FavoritesMutation id={props.id} favorite={props.favorite}>
      {(favoriteListing) => (
        <Listing
          onViewTour={() => viewTour()}
          onFavorite={() => favoriteListing()}
          onOpenTour={() => {
            viewTour()
            onOpenTour()
          }}
          {...props}
        />
      )}
    </FavoritesMutation>
  )
}

export default compose(
  withFavoriteListingByID,
  withViewTourMutation,
  mapProps(({viewTour, ...props}) => ({
    viewTour: _.once(viewTour),
    ...props
  }))
)(ListingApp)
