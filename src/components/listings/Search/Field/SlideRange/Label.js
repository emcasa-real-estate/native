import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles, {labelTip} from './styles'

export default function SlideRangeLabel({children, style, tipOffset = 0}) {
  return (
    <View style={[styles.label].concat(style)}>
      <View style={styles.labelBody}>
        <Text style={styles.labelText}>{children}</Text>
      </View>
      <View style={labelTip.container(tipOffset)}>
        <View style={labelTip.right(tipOffset)} />
        <View style={labelTip.left(tipOffset)} />
      </View>
    </View>
  )
}
