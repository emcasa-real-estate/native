import {View, TouchableOpacity, Dimensions} from 'react-native'

import LikeIcon from '@/components/listings/LikeIcon'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Price from '@/components/shared/Price'
import Image from '@/components/listings/Image'
import styles, {iconColor} from './styles'

function Button({children, icon, hitSlop, ...props}) {
  return (
    <TouchableOpacity
      {...props}
      accessible
      style={styles.iconButton}
      hitSlop={{
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop
      }}
    >
      {children || <Icon name={icon} size={19} color={iconColor} />}
    </TouchableOpacity>
  )
}

Button.defaultProps = {hitSlop: 15}

function LikeButton({favorite, ...props}) {
  return (
    <Button
      {...props}
      accessibilityLabel={
        favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
      testID="favorite_button"
    >
      <LikeIcon active={favorite} size={19} />
    </Button>
  )
}

export default function ListingCard({
  style,
  address,
  images,
  width,
  price,
  isActive,
  favorite,
  onFavorite,
  onPress,
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
    <View style={[styles.container].concat(style, {width})} {...props}>
      <View testID={`listing_card(${testUniqueID})`}>
        <View style={styles.thumbnail}>
          <Image thumbnail style={styles.image} {...image} {...imageSize} />
        </View>
        <View style={styles.body}>
          <View style={[styles.row, styles.buttonsRow]}>
            <View>
              {isActive && (
                <LikeButton favorite={favorite} onPress={onFavorite} />
              )}
            </View>
            <View>
              <Button
                hitSlop={30}
                label="Visualizar"
                icon="share"
                onPress={onPress}
              />
            </View>
          </View>
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
  testUniqueID: '',
  get width() {
    return Dimensions.get('window').width
  }
}
