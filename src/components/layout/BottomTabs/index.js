import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function BottomTabs({tabs, currentTab, onNavigate}) {
  return (
    <View style={styles.container} testID="bottom_tabs">
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
