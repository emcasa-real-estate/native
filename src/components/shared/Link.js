import {TouchableOpacity} from 'react-native'

import * as colors from '@/assets/colors'
import Text from './Text'

const baseStyle = {
  color: colors.blue.medium
}

export default function Link({onPress, style, ...props}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text {...props} style={[baseStyle].concat(style)} />
    </TouchableOpacity>
  )
}
