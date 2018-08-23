import _ from 'lodash/fp'
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

import SuccessScreen from '@/screens/modules/shared/Success'

class InterestFormScreen extends PureComponent {
  static screenName = 'interest.Form'

  static options = {
    topBar: {
      title: {text: 'Marcar visita'},
      backButton: {title: ''}
    },
    bottomTabs: {
      visible: false,
      drawBehind: true,
      animated: false
    }
  }

  state = {value: undefined, interestType: undefined, active: false}

  openSuccessModal = _.once(() => {
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
            Navigation.dismissModal(`${componentId}_success`)
            Navigation.pop(componentId)
          }
        }
      }
    })
  })

  get defaultValue() {
    const {user} = this.props
    if (user)
      return {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
  }

  componentDidUpdate(prev) {
    const {loading, error} = this.props
    const finishedLoading = prev.loading && !loading
    if (finishedLoading && !error && this.state.active) this.openSuccessModal()
  }

  componentDidAppear() {
    this.setState({active: true})
  }

  componentDidDisappear() {
    this.setState({active: false})
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {
      request,
      loading,
      params: {id}
    } = this.props
    const {value} = this.state
    const interestType = value.interest_type_id
    if (loading) return
    request(id, value)
    this.setState({interestType})
  }

  render() {
    const {types, loading, error} = this.props
    const {value} = this.state

    return (
      <Shell>
        <Body scroll>
          <Form
            types={types}
            error={error}
            value={value}
            defaultValue={this.defaultValue}
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
