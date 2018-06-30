import {View, TouchableOpacity} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

export default function CameraRollHeader({selectedCount, onDismiss, onSubmit}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {`${selectedCount} ${
          selectedCount === 1 ? 'imagem' : 'imagens'
        } selecionadas`}
      </Text>
      <TouchableOpacity onPress={selectedCount !== 0 ? onSubmit : onDismiss}>
        <Icon name={selectedCount !== 0 ? 'check' : 'times'} size={24} />
      </TouchableOpacity>
    </View>
  )
}
