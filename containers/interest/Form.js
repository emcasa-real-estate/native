import {Component} from 'react'
import {connect} from 'react-redux'

import {getUser} from '@/redux/modules/auth/selectors'
import {getInterestTypes} from '@/redux/modules/interest/types/selectors'
import {isLoading, getError} from '@/redux/modules/interest/form/selectors'
import {request} from '@/redux/modules/interest/form'
import Form from '@/components/interest/Form'

const CALENDLY_ID = 5

class InterestFormApp extends Component {
  componentDidUpdate(prev) {
    const {onSuccess, loading, error} = this.props
    const finishedLoading = prev.loading && !loading
    if (finishedLoading && !error && onSuccess) onSuccess()
  }

  onSubmit = (params) => {
    const {request, id, loading, onOpenCalendly} = this.props
    if (loading) return
    if (params.interest_type_id === CALENDLY_ID) {
      params.message =
        'Esta mensagem está sendo enviada porque algum usuário tentou agendar uma visita pelo Calendly neste imóvel.'
      if (onOpenCalendly) onOpenCalendly()
    }
    request(id, params)
  }

  render() {
    return <Form {...this.props} onSubmit={this.onSubmit} />
  }
}

const props = (state) => ({
  types: getInterestTypes(state),
  loading: isLoading(state),
  error: getError(state),
  user: getUser(state)
})

const actions = {request}

export default connect(props, actions)(InterestFormApp)
