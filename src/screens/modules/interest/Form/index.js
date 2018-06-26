import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {getUser} from '@/redux/modules/auth/selectors'
import {getInterestTypes} from '@/redux/modules/interest/types/selectors'
import {isLoading, getError} from '@/redux/modules/interest/form/selectors'
import {request} from '@/redux/modules/interest/form'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Form from '@/components/interest/Form'

import CalendlyScreen from '@/screens/modules/interest/Calendly'
import SuccessScreen from '@/screens/modules/shared/Success'

const CALENDLY_ID = 5

class InterestFormScreen extends PureComponent {
  static screenName = 'interest.Form'

  static options = {
    topBar: {
      title: {text: 'Marcar visita'},
      backButtonTitle: ''
    }
  }

  state = {value: {}, interestType: undefined}

  openCalendly = () => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        id: `${componentId}_calendly`,
        name: CalendlyScreen.screenName
      }
    })
  }

  openSuccessModal = () => {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          title: 'Agente EmCasa notificado',
          children:
            'Entraremos em contato o mais rápido possível para agendarmos uma visita!',
          onDismiss: () => {
            Navigation.pop(componentId)
            Navigation.dismissModal(`${componentId}_success`)
          }
        }
      }
    })
  }

  componentDidUpdate(prev) {
    const {loading, error} = this.props
    const {interestType} = this.state
    const finishedLoading = prev.loading && !loading
    if (finishedLoading && !error && interestType !== CALENDLY_ID)
      this.openSuccessModal()
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {request, loading, params: {id}} = this.props
    const {value} = this.state
    const interestType = value.interest_type_id
    if (loading) return
    if (interestType === CALENDLY_ID) {
      value.message =
        'Esta mensagem está sendo enviada porque algum usuário tentou agendar uma visita pelo Calendly neste imóvel.'
      this.openCalendly()
    }
    request(id, value)
    this.setState({interestType})
  }

  render() {
    const {user, types, loading, error} = this.props
    const {value} = this.state

    return (
      <Shell>
        <Body scroll>
          <Form
            types={types}
            user={user}
            error={error}
            value={value}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      types: getInterestTypes(state),
      loading: isLoading(state),
      error: getError(state),
      user: getUser(state)
    }),
    {request}
  )
)(InterestFormScreen)
