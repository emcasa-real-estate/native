import {View, TouchableOpacity} from 'react-native'

import Text from '@/components/shared/Text'
import $styles from './styles'

function Button({styles, style, children, disabled, onPress}) {
  return (
    <TouchableOpacity style={style} onPress={disabled ? undefined : onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  color: 'blue'
}

export default $styles.inject()(Button)
