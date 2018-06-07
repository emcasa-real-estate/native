import {View, ActivityIndicator} from 'react-native'

import styles from './styles'

export default function LoadingView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" {...props} />
      </View>
    </View>
  )
}
