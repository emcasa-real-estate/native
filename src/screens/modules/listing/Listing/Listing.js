import _ from 'lodash'
import {compose, mapProps} from 'recompose'

import {
  withFavoriteMutation,
  withBlacklistMutation,
  withViewTourMutation
} from '@/graphql/containers'
import Listing from '@/components/listings/Listing'

function ListingApp({viewTour, onOpenTour, ...props}) {
  return (
    <Listing
      onViewTour={() => viewTour()}
      onOpenTour={() => {
        viewTour()
        onOpenTour()
      }}
      {...props}
    />
  )
}

export default compose(
  withFavoriteMutation,
  withBlacklistMutation,
  withViewTourMutation,
  mapProps(({viewTour, ...props}) => ({
    viewTour: _.once(viewTour),
    ...props
  }))
)(ListingApp)
