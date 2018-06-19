import _ from 'lodash'
import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {getData} from '@/redux/modules/listings/data/selectors'
import {Modal, Body} from '@/components/shared/Shell'
import Gallery from '@/components/listings/Gallery'
// import RelatedListings from '@/containers/listings/Feed/Related'

@connect(
  (state, {params}) => ({
    data: getData(state, params) || {}
  }),
  null,
  null,
  {withRef: true}
)
export default class ListingGalleryScreen extends PureComponent {
  static screenName = 'listing.Gallery'

  static options = {}

  render() {
    const {data} = this.props

    return (
      <Modal>
        <Body>
          <Gallery>{data.images}</Gallery>
        </Body>
      </Modal>
    )
  }
}
