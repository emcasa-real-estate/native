import {PureComponent} from 'react'

import {Modal, Body} from '@/components/layout'
import Text from '@/components/shared/Text'
import styles from './styles'

export default class SuccessScreen extends PureComponent {
  static defaultProps = {testID: '@shared.Success'}

  static screenName = 'shared.Success'

  render() {
    const {testID, title, children, onDismiss} = this.props

    return (
      <Modal testID={testID} style={styles.container}>
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
