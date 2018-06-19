import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import * as format from '@/assets/format'
import {load} from '@/redux/modules/listings/data'
import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import Shell, {Body, Footer, Section} from '@/components/shared/Shell'
import Button from '@/components/shared/Button'
import GalleryScreen from '@/screens/listing/Gallery'
import Listing from './Listing'
// import RelatedListings from '@/containers/listings/Feed/Related'

@connect(
  (state, {params}) => ({
    data: getData(state, params) || {},
    loading: isLoading(state, params)
  }),
  {load},
  null,
  {withRef: true}
)
export default class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {}

  updateNavigation() {
    const {data, componentId} = this.props
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {text: `R$${format.number(data.price)}`}
      }
    })
  }

  componentDidMount() {
    const {data, load, params: {id}} = this.props
    if (_.isEmpty(data)) load(id)
    else this.updateNavigation()
  }

  componentDidUpdate(prev) {
    const {data} = this.props
    if (data && !_.isEqual(data, prev.data)) this.updateNavigation()
  }

  navigateTo = (component) => () => {
    const {componentId, params} = this.props
    Navigation.push(componentId, {
      component: {
        ...component,
        passProps: {params}
      }
    })
  }

  onOpenGallery = () => {
    const {params, componentId} = this.props
    const id = `${componentId}_gallery`
    Navigation.showModal({
      component: {
        id,
        name: GalleryScreen.screenName,
        passProps: {
          params,
          onDismiss: () => Navigation.dismissModal(id)
        }
      }
    })
  }

  renderFooter() {
    const {loading, params} = this.props
    if (loading) return null
    return (
      <Button
        color="green"
        onPress={this.navigateTo({
          name: null
        })}
      >
        {params.editing ? 'Editar' : 'Marcar visita'}
      </Button>
    )
  }

  render() {
    const {loading, data} = this.props

    return (
      <Shell>
        <Body scroll style={{flex: 1}}>
          {!loading && <Listing {...data} onOpenGallery={this.onOpenGallery} />}
          {/* !loading && (
          <Section title="Veja Também">
            <RelatedListings id={id} />
          </Section>
        ) */}
        </Body>
        <Footer>{this.renderFooter()}</Footer>
      </Shell>
    )
  }
}
