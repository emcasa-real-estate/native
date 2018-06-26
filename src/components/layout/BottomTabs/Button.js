import {TouchableOpacity} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import styles, {iconColor} from './styles'

export default function NavButton({children, icon, active, ...props}) {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={children}
      style={styles.buttonContainer}
      {...props}
    >
      <Icon
        name={icon}
        color={iconColor[active ? 'active' : 'default']}
        size={17}
        style={styles.icon}
      />
      <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
