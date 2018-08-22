import {Component} from 'react'
import {Navigation} from 'react-native-navigation'

import {Modal, Body} from '@/components/layout'
import LearnMore from './LearnMore'

import ContactScreen from '@/screens/modules/listingForm/Contact'

export default class LearnMoreScreen extends Component {
  static screenName = 'listingForm.LearnMore'

  onClose = () => {
    Navigation.dismissAllModals()
  }

  onOpenContactForm = () => {
    Navigation.showModal({
      component: {name: ContactScreen.screenName}
    })
  }

  render() {
    return (
      <Modal testID="@listingForm.LearnMore">
        <Modal.Header onDismiss={this.onClose} />
        <Body>
          <LearnMore
            onClose={this.onClose}
            onOpenContactForm={this.onOpenContactForm}
          />
        </Body>
      </Modal>
    )
  }
}
