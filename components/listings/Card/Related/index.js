import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Price from '@/components/shared/Price'
import Image from '@/components/listings/Image'
import touchable from '../touchable'
import $styles from './styles'

function RelatedListingCard({
  styles,
  style,
  width,
  images,
  price,
  address,
  ...props
}) {
  const image = images[0] || {}
  const padding = 15
  const imageSize = {
    width: width - padding * 2,
    height: width * 0.64 - padding * 2
  }
  return (
    <View style={styles.container.concat(style, {width})} {...props}>
      <View style={styles.thumbnail}>
        <Image thumbnail style={styles.image} {...image} {...imageSize} />
      </View>
      <View style={styles.body}>
        <Price size={26} styles={{text: styles.priceText}}>
          {price}
        </Price>
        <Text style={styles.street} numberOfLines={1} ellipsizeMode="tail">
          {address.street}
        </Text>
        <Text style={styles.neighborhood}>
          {address.neighborhood.toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default touchable($styles.inject()(RelatedListingCard))
