import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Dashboard from '@/components/listings/Dashboard'

class ListingDashboardScreen extends PureComponent {
  static screenName = 'listing.Dashboard'

  static options = {
    topBar: {
      title: {text: 'Estatísticas'}
    },
    bottomTabs: {
      visible: false,
      animated: false
    }
  }

  updateTitle() {
    const {
      componentId,
      listing: {data}
    } = this.props
    if (!data || !data.address) return
    Navigation.mergeOptions(componentId, {
      topBar: {title: {text: data.address.street}}
    })
  }

  componentDidMount() {
    this.updateTitle()
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.listing.data, this.props.listing.data))
      this.updateTitle()
  }

  render() {
    const {
      listing: {data, loading}
    } = this.props

    return (
      <Shell testID="@listing.Dashboard">
        <Body loading={loading}>{data && <Dashboard {...data} />}</Body>
      </Shell>
    )
  }
}

export default composeWithRef(withListing(({params: {id}}) => ({id})))(
  ListingDashboardScreen
)
