import {Dimensions} from 'react-native'

import Card from '@/components/listings/Card/Map'
import HorizontalFeed from '../Horizontal'

export default function MapFeed({active, ...props}) {
  const width = Dimensions.get('window').width
  return (
    <HorizontalFeed
      {...props}
      active={active}
      itemWidth={width / 1.5}
      renderItem={(item) => (
        <Card primary={active === item.id} width={width / 1.5} {...item} />
      )}
    />
  )
}
