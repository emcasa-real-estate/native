import {PixelRatio} from 'react-native'

import * as image from '@/assets/image'
import LAYOUTS from './layouts'

const px = PixelRatio.getPixelSizeForLayoutSize

export default function ListingImage({
  layout,
  filename,
  thumbnail,
  width,
  height,
  resolution,
  ...props
}) {
  const Component = LAYOUTS[layout]
  if (!Component) throw new Error(`Invalid ListingImage layout "${layout}".`)
  delete props.position
  delete props.layout
  return (
    <Component
      source={{
        uri: ListingImage.url(filename, {
          thumbnail,
          width: px(width) * resolution,
          height: px(height) * resolution
        })
      }}
      width={width}
      height={height}
      {...props}
    />
  )
}

ListingImage.defaultProps = {
  layout: 'static',
  resolution: 1
}

ListingImage.url = (
  filename = 'default_w4ki8j.jpg',
  {thumbnail, width, height}
) => {
  let options
  if (width && height) options = {width, height}
  else if (thumbnail) options = {width: px(400), height: px(200)}
  else options = {width: px(600), height: px(400)}
  return image.url(filename, options)
}
