import {Image} from 'react-native'

import {withRatio} from '@/assets/image'

const ratio = withRatio({width: 264, height: 72})

export default function Logo({width, height, ...props}) {
  return (
    <Image
      {...props}
      style={ratio({width, height})}
      source={require('@/assets/img/logo.png')}
    />
  )
}
