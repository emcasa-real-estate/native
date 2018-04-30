import {Modal, View, SafeAreaView, TouchableOpacity} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Responsive from '@/containers/shared/Orientation/Responsive'
import {withOrientation} from '@/containers/shared/Orientation/Provider/Context'
import $styles from './styles'

function ControlledModal({
  children,
  title,
  closeIcon,
  onDismiss,
  styles,
  ...props
}) {
  return (
    <Modal
      {...props}
      onRequestClose={onDismiss}
      supportedOrientations={['portrait', 'landscape']}
      onDismiss={onDismiss}
    >
      <Responsive>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
              <Icon name={closeIcon} color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>{children}</View>
        </SafeAreaView>
      </Responsive>
    </Modal>
  )
}

ControlledModal.defaultProps = {
  closeIcon: 'times',
  animationType: 'slide'
}

export default withOrientation($styles.inject()(ControlledModal))
