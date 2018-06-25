import {View} from 'react-native'

import styles from './styles'

export default function Progress({progress}) {
  const complete = progress === 1
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          complete && styles.progressComplete,
          {flex: progress}
        ]}
      />
      <View style={[styles.background, {flex: progress - 1}]} />
    </View>
  )
}

Progress.defaultProps = {
  progress: 0
}
