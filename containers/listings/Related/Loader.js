import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/relations'
import {getRelatedListings} from '@/redux/modules/listings/relations/selectors'
import Loader from '@/containers/shared/Loader'

export class RelatedLoader extends PureComponent {
  onLoad = () => {
    const {load, id} = this.props
    load(id)
  }

  render() {
    const {id} = this.props
    return <Loader {...this.props} params={id} onLoad={this.onLoad} />
  }
}

const props = (state, props) => ({
  online: state.network.isConnected,
  data: getRelatedListings(state, props)
})

const actions = {
  load
}

export const withRelatedListings = connect(props, actions)

export default withRelatedListings(RelatedLoader)
