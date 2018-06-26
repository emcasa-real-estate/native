import PhotoView from 'react-native-photo-view'

export default function ScalableImage({style, ...props}) {
  delete props.width
  delete props.height
  return (
    <PhotoView
      style={[{position: 'relative', width: '100%', height: '100%'}, style]}
      {...props}
    />
  )
}

ScalableImage.defaultProps = {
  resizeMode: 'cover',
  minimumZoomScale: 1
}
