import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Dashboard from '@/components/listings/Dashboard'

class ListingDashboardScreen extends PureComponent {
  static screenName = 'listing.Dashboard'

  static options = {
    topBar: {
      title: {text: 'Estatísticas'}
    }
  }

  render() {
    const {listing: {data, loading}} = this.props

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
