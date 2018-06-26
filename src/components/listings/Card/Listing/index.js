import {View, TouchableOpacity} from 'react-native'

import LikeIcon from '@/components/listings/LikeIcon'
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
  isActive,
  favorite,
  onFavorite,
  testID,
  testUniqueID,
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
      <View testID={`listing_card(${testUniqueID})`}>
        <View style={styles.thumbnail}>
          {isActive && (
            <TouchableOpacity
              accessible
              accessibilityLabel={
                favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
              }
              testID="favorite_button"
              style={styles.iconButton}
              onPress={onFavorite}
              hitSlop={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
              }}
            >
              <LikeIcon contrast active={favorite} />
            </TouchableOpacity>
          )}
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
          <Price nullable size={22} styles={{text: styles.priceText}}>
            {price}
          </Price>
        </View>
      </View>
    </View>
  )
}

ListingCard.defaultProps = {
  testUniqueID: ''
}

export default touchable($styles.inject()(ListingCard))
