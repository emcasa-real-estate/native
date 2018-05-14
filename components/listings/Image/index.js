import * as image from '@/assets/image'
import LAYOUTS from './layouts'

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
          width: width * resolution,
          height: height * resolution
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
  resolution: 2
}

ListingImage.url = (
  filename = 'default_w4ki8j.jpg',
  {thumbnail, width, height}
) => {
  let options
  if (width && height) options = {width, height}
  else if (thumbnail) options = {width: 400, height: 200}
  else options = {width: 600, height: 400}
  return image.url(filename, options)
}
