import {PureComponent} from 'react'

import {Modal, Body} from '@/components/layout'
import Text from '@/components/shared/Text'
import styles from './styles'

export default class SuccessScreen extends PureComponent {
  static screenName = 'shared.Success'

  render() {
    const {title, children, onDismiss} = this.props

    return (
      <Modal style={styles.container}>
        <Modal.Header inline onDismiss={onDismiss} />
        <Body style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          {typeof children === 'string' ? (
            <Text style={styles.message}>{children}</Text>
          ) : (
            children
          )}
        </Body>
      </Modal>
    )
  }
}
