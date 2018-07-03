import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {load as loadListing} from '@/redux/modules/listings/data'
import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import {Shell, Body} from '@/components/layout'
import Dashboard from '@/components/listings/Dashboard'

@connect(
  (state, {params}) => ({
    data: getData(state, params),
    loading: isLoading(state, params)
  }),
  {loadListing},
  null,
  {withRef: true}
)
export default class ListingDashboardScreen extends PureComponent {
  static screenName = 'listing.Dashboard'

  static options = {
    topBar: {
      title: {text: 'Estatísticas'}
    }
  }

  componentDidMount() {
    const {data, loadListing, params: {id}} = this.props
    if (!data) loadListing(id)
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  render() {
    const {data, loading} = this.props

    return (
      <Shell testID="@listing.Dashboard">
        <Body loading={loading !== false} onLayout={this.onLayout}>
          {data && <Dashboard {...data} />}
        </Body>
      </Shell>
    )
  }
}
