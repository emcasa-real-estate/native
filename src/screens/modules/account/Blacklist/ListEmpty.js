import {connect} from 'react-redux'

import Empty from '@/components/listings/Feed/Empty'

function EmptyApp({online}) {
  return (
    <Empty title={online ? 'Sem resultados' : 'Você está offline'}>
      {online
        ? 'Você não tem imóveis ocultados'
        : 'Não foi possível carregar resultados.'}
    </Empty>
  )
}

const props = (state) => ({
  online: state.network.isConnected
})

export default connect(props)(EmptyApp)
