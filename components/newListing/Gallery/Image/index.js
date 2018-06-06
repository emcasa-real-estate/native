import {View, Image, PixelRatio} from 'react-native'

import * as image from '@/assets/image'
import styles, {getDimensions} from './styles'

export default function GalleryImage({filename}) {
  const {height, width} = getDimensions()
  return (
    <View style={styles.container}>
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
