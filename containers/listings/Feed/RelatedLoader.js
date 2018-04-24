import {PureComponent} from 'react'
import withNavigation from 'react-navigation/src/views/withNavigation'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/relations'
import {getRelatedListings} from '@/redux/modules/listings/relations/selectors'
import Loader from '@/containers/shared/Loader'

@withNavigation
export class RelatedLoader extends PureComponent {
  onLoad = () => {
    const {load, id} = this.props
    load(id)
  }

  onSelect = (id) => {
    const {navigation} = this.props
    navigation.navigate('listing', {id})
  }

  render() {
    const {id} = this.props
    return (
      <Loader
        {...this.props}
        params={id}
        onLoad={this.onLoad}
        props={{onSelect: this.onSelect}}
      />
    )
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
