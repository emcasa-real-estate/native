import {View, TouchableOpacity, ActivityIndicator} from 'react-native'
import withNavigation from 'react-navigation/src/views/withNavigation'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Link from '@/components/shared/Link'
import styles, {iconColor} from './styles'

function FormHeader({
  title,
  buttonText,
  loading,
  onSubmit,
  onReturn,
  navigation
}) {
  const onReturnFun = onReturn || (() => navigation.goBack(null))
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onReturnFun}>
          <Icon name="chevron-left" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.resetButton}>
        {loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator animating size="small" />
          </View>
        )}
        <Link style={styles.resetLink} onPress={onSubmit}>
          {buttonText}
        </Link>
      </View>
    </View>
  )
}

FormHeader.defaultProps = {
  buttonText: 'Enviar'
}

export default withNavigation(FormHeader)
