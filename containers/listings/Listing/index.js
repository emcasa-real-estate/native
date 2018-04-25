import View from '@/components/listings/Listing'
import Loader from './Loader'

export default function ListingApp({id, ...props}) {
  return (
    <Loader id={id}>
      {({data, favorite, onFavorite, onViewTour}) =>
        data && (
          <View
            {...data}
            {...props}
            favorite={favorite}
            onFavorite={onFavorite}
            onViewTour={onViewTour}
          />
        )
      }
    </Loader>
  )
}

export {default as Price} from './Price'
