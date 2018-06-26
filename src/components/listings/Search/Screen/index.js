import {View, ScrollView} from 'react-native'

import Button from '@/components/shared/Button'
import styles from './styles'

export default function SearchScreen({children, label, onSubmit}) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView>{children}</ScrollView>
      </View>
      <View style={styles.footer}>
        <Button onPress={onSubmit}>{label}</Button>
      </View>
    </View>
  )
}

SearchScreen.defaultProps = {
  label: 'Filtrar resultados'
}
