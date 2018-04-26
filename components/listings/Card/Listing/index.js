import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '@/components/shared/Text'
import Price from '@/components/shared/Price'
import Image from '@/components/listings/Image'
import touchable from '../touchable'
import $styles from './styles'

function ListingCard({
  styles,
  style,
  address,
  images,
  width,
  price,
  favorite,
  onFavorite,
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
        <TouchableOpacity style={styles.iconButton} onPress={onFavorite}>
          <Icon
            name={favorite ? 'heart' : 'heart-outline'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Image thumbnail style={styles.image} {...image} {...imageSize} />
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.street} numberOfLines={1} ellipsizeMode="tail">
            {address.street}
          </Text>
          <Text style={styles.neighborhood}>
            {address.neighborhood.toUpperCase()}
          </Text>
        </View>
        <Price size={22} styles={{text: styles.priceText}}>
          {price}
        </Price>
      </View>
    </View>
  )
}

export default touchable($styles.inject()(ListingCard))
