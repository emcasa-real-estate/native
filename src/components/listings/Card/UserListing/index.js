import {View, TouchableOpacity, Dimensions} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Image from '@/components/listings/Image'
import touchable from '../touchable'
import styles, {iconColor, linkColor} from './styles'

function Button({title, icon, onPress}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={[styles.thumbnailButton, styles.thumbnailButtonEnd]}>
        <Icon
          style={styles.buttonIcon}
          color={iconColor}
          name={icon}
          size={24}
        />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function UserListingCard({
  style,
  active,
  address,
  images,
  width,
  testUniqueID,
  onEdit,
  onViewStats,
  onViewListing,
  ...props
}) {
  const image = images[0] || {}
  const padding = 15
  const imageSize = {
    width: width - padding * 2,
    height: width * 0.64 - padding * 2
  }

  return (
    <View style={[styles.container, style]} {...props}>
      <View testID={`listing_card(${testUniqueID})`}>
        <View style={styles.thumbnail}>
          {active && (
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.link} onPress={onViewListing}>
                <Text style={styles.linkText}>Visualizar</Text>
                <Icon name="share" size={16} color={linkColor} />
              </TouchableOpacity>
            </View>
          )}
          <Image thumbnail style={styles.image} {...image} {...imageSize} />
          {active && (
            <View style={styles.bottomBar}>
              <Button
                title="Estatísticas"
                icon="chart-line"
                onPress={onViewStats}
              />
              <Button title="Editar" icon="cogs" onPress={onEdit} />
            </View>
          )}
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
        </View>
      </View>
    </View>
  )
}

UserListingCard.defaultProps = {
  testUniqueID: '',
  get width() {
    return Dimensions.get('window').width
  }
}

export default touchable(UserListingCard)
