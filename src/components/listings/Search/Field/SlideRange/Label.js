import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles, {TIP_HEIGHT, LABEL_WIDTH} from './styles'

export default function SlideRangeLabel({children, style, tipOffset = 0}) {
  return (
    <View style={[styles.label].concat(style)}>
      <View style={styles.labelBody}>
        <Text style={styles.labelText}>{children}</Text>
      </View>
      <View
        style={[styles.labelTip, {marginLeft: -TIP_HEIGHT / 2 + tipOffset}]}
      />
    </View>
  )
}
