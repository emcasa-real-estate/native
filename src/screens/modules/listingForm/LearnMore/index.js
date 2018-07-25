import {Component} from 'react'
import {Navigation} from 'react-native-navigation'

import {Modal, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import LearnMore from './LearnMore'

export default class LearnMoreScreen extends Component {
  static screenName = 'listingForm.LearnMore'

  onClose = () => {
    Navigation.dismissAllModals()
  }

  render() {
    return (
      <Modal testID="@listingForm.LearnMore">
        <Modal.Header onDismiss={this.onClose} />
        <Body>
          <LearnMore />
        </Body>
        <Footer style={{padding: 15}}>
          <Button color="blue" onPress={this.onClose}>
            Anuncie agora
          </Button>
        </Footer>
      </Modal>
    )
  }
}
