import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({tabs, currentTab, onNavigate}) {
  return (
    <View style={styles.container}>
      {tabs.map(({id, icon, title}) => (
        <Button
          key={`${title}_${id}`}
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
