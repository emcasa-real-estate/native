import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({stack, currentTab, onNavigate}) {
  return (
    <View testID="@shared.Shell.Navigation" style={styles.container}>
      {stack.map(({id, icon, title}) => (
        <Button
          key={id}
          active={id === currentTab}
          icon={icon}
          onPress={() => onNavigate(id)}
        >
          {title}
        </Button>
      ))}
    </View>
  )
}
