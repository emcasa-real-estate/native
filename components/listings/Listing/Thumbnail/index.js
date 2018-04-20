import {View, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Matterport from '@/components/listings/Matterport'
import Image from '../../Image'
import styles from './styles'

const ActionButton = ({title, icon, onPress}) => (
  <View style={styles.button}>
    <TouchableOpacity
      accessible
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress={onPress}
    >
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  </View>
)

export default function ListingThumbnail({images, matterport_code, onOpen}) {
  const image = images[0] || {}
  let {width, height} = Dimensions.get('window')
  height = width * 0.64
  return (
    <View style={styles.container}>
      <View
        onMoveShouldSetResponder={() => true}
        onStartShouldSetResponder={() => true}
      >
        <Matterport code={matterport_code} width={width} height={height}>
          <Image thumbnail {...image} width={width} height={height} />
        </Matterport>
      </View>
      <View style={styles.actions}>
        <ActionButton
          title="Ver Imagens"
          icon="camera"
          onPress={onOpen('gallery')}
        />
        {matterport_code && (
          <ActionButton
            title="Ver em Tela Cheia"
            icon="fullscreen"
            onPress={onOpen('matterport')}
          />
        )}
      </View>
    </View>
  )
}
