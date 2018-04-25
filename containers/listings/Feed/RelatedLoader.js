import {PureComponent} from 'react'
import _ from 'lodash'
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

  get status() {
    return _.pick(this.props, ['online', 'data'])
  }

  render() {
    const {id} = this.props
    return (
      <Loader
        as={this.props.as}
        children={this.props.children}
        params={id}
        onLoad={this.onLoad}
        onSelect={this.onSelect}
        {...this.status}
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
