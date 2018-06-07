import {View, Image, TouchableOpacity, PixelRatio} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import * as image from '@/assets/image'
import styles, {getDimensions} from './styles'

export default function GalleryImage({filename, position, onDelete}) {
  const {height, width} = getDimensions()
  return (
    <View style={styles.container}>
      {position == 0 && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>FOTO DE CAPA</Text>
        </View>
      )}
      <View style={styles.button}>
        <TouchableOpacity
          onPress={onDelete}
          hitSlop={{
            top: 15,
            bottom: 15,
            left: 15,
            right: 15
          }}
        >
          <Icon
            name="trash"
            type="solid"
            color="rgba(255,255,255,0.5)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="20"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: image.url(filename, {
            width: width * 2,
            height: PixelRatio.getPixelSizeForLayoutSize(height) * 2
          })
        }}
        style={[styles.image, {width}]}
        width={width}
        height={height}
      />
    </View>
  )
}
