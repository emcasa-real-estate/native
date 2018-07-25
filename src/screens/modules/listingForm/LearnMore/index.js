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
      <Modal testID="@listingForm.Created">
        <Modal.Header inline onDismiss={this.onClose}>
          Venda o seu imóvel com a EmCasa
        </Modal.Header>
        <Body style={{padding: 15}}>
          <LearnMore />
        </Body>
        <Footer style={{padding: 15}}>
          <Button color="blue" onPress={this.onClose}>
            Continuar
          </Button>
        </Footer>
      </Modal>
    )
  }
}
