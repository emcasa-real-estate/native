import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withRequestContactMutation} from '@/graphql/containers'
import {withUserProfile} from '@/graphql/containers'
import {Modal, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import ContactForm from '@/components/newListing/ContactForm'

import SuccessScreen from '@/screens/modules/shared/Success'

class ContactScreen extends PureComponent {
  static defaultProps = {
    user: {}
  }

  static screenName = 'listingForm.Contact'

  state = {
    value: {}
  }

  form = React.createRef()

  async requestContact() {
    const {requestContact} = this.props
    const {value} = this.state
    try {
      await requestContact(value)
      this.openSuccessModal()
    } catch (err) {
      this.validateForm()
    }
  }

  openSuccessModal = () => {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          title: 'Agente EmCasa notificado',
          children: 'Entraremos em contato o mais rápido possível!',
          onDismiss: () => Navigation.dismissAllModals()
        }
      }
    })
  }

  validateForm = () => {
    return (
      this.props.validAddress !== false &&
      this.form.current &&
      this.form.current.onValidate()
    )
  }

  onClose = () => Navigation.dismissModal(this.props.componentId)

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {loading} = this.props
    if (!loading && this.form.current.onValidate()) this.requestContact()
  }

  render() {
    const {user, value, loading} = this.props
    return (
      <Modal testID="@listingForm.Contact">
        <Modal.Header inline onDismiss={this.onClose}>
          Fale com um consultor
        </Modal.Header>
        <Body scroll>
          <ContactForm
            formRef={this.form}
            value={value}
            defaultValue={{
              name: user.name,
              phone: user.phone,
              email: user.email
            }}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Modal>
    )
  }
}

export default composeWithRef(withUserProfile, withRequestContactMutation())(
  ContactScreen
)
