import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({tabs, currentTab, onNavigate}) {
  return (
    <View testID="@shared.Shell.Navigation" style={styles.container}>
      {tabs.map(({id, icon, title}) => (
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
