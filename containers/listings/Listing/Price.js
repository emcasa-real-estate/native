import Price from '@/components/shared/Price'
import {withListing} from './Loader'

function ListingNavigationApp({data, ...props}) {
  return data ? <Price {...props}>{data.price}</Price> : null
}

export default withListing(ListingNavigationApp)
