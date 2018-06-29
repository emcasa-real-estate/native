import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'

import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Shell from './Shell'

export default function Modal({style, ...props}) {
  return (
    <Shell
      style={[{marginTop: Platform.OS === 'ios' ? 20 : 0}].concat(style)}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1
  },
  button: {
    flex: 0
  },
  title: {
    flex: 1
  },
  titleText: {
    textAlign: 'center',
    marginRight: 20,
    fontSize: 18,
    color: colors.gray.dark
  }
})

Modal.Header = ({style, children, inline, iconColor, onDismiss}) => (
  <View style={[styles.header, !inline && styles.headerAbsolute, style]}>
    <View style={styles.button}>
      <TouchableOpacity
        testID="close_modal_button"
        onPress={onDismiss}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      >
        <Icon
          name="times"
          size={24}
          strokeWidth={20}
          stroke={iconColor}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
    {children && (
      <View style={styles.title}>
        <Text style={styles.titleText}>{children}</Text>
      </View>
    )}
  </View>
)

Modal.Header.displayName = 'Modal.Header'

Modal.Header.defaultProps = {
  iconColor: colors.gray.dark
}
