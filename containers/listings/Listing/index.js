import View from '@/components/listings/Listing'
import Loader from './Loader'

export default function ListingApp({id, ...props}) {
  return (
    <Loader id={id}>
      {({data, loading, favorite, onFavorite, onViewTour}) =>
        !loading &&
        data && (
          <View
            {...data}
            {...props}
            loading={loading}
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
