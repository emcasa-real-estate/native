import {View, TouchableOpacity} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import $styles, {iconColor} from './styles'

function renderTitle(title) {
  if (!title) return undefined
  if (typeof title === 'string')
    return <Text style={$styles.titleText}>{title}</Text>
  return title
}

function Header({styles, title, root, onReturn}) {
  return (
    <View style={styles.container}>
      {!root && (
        <View style={styles.button}>
          <TouchableOpacity onPress={onReturn}>
            <Icon name="chevron-left" color={iconColor} size={22} />
          </TouchableOpacity>
        </View>
      )}
      {title && <View style={styles.title}>{renderTitle(title)}</View>}
    </View>
  )
}

export default $styles.inject()(Header)
