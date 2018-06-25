import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {getData} from '@/redux/modules/listings/data/selectors'
import {Modal, Body} from '@/components/layout'
import Matterport from '@/components/listings/Matterport'
// import RelatedListings from '@/containers/listings/Feed/Related'

@connect(
  (state, {params}) => ({
    data: getData(state, params) || {}
  }),
  null,
  null,
  {withRef: true}
)
export default class ListingTourScreen extends PureComponent {
  static screenName = 'listing.Tour'

  static options = {
    layout: {
      orientation: ['portrait', 'landscape']
    }
  }

  state = {layout: {}}

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  render() {
    const {data, onDismiss} = this.props
    const {layout} = this.state

    return (
      <Modal>
        <Modal.Header
          iconColor="white"
          style={{marginTop: 60, alignItems: 'flex-end'}}
          onDismiss={onDismiss}
        />
        <Body onLayout={this.onLayout}>
          <Matterport code={data.matterportCode} {...layout} />
        </Body>
      </Modal>
    )
  }
}
