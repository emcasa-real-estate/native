import {Image} from 'react-native'

import * as image from '@/assets/image'

export default function StaticImage({style, width, height, ...props}) {
  return (
    <Image style={[StaticImage.ratio({width, height}), style]} {...props} />
  )
}

StaticImage.ratio = image.withRatio({width: 400, height: 200})
