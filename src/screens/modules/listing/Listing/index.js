import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import Share from 'react-native-share'
import {connect} from 'react-redux'

import {FRONTEND_URL} from '@/lib/config'
import composeWithRef from '@/lib/composeWithRef'
import * as format from '@/assets/format'
import {withListing} from '@/graphql/containers'
import {logEvent} from '@/redux/modules/firebase/analytics'
import {load as loadRelatedListings} from '@/redux/modules/relatedListings'
import {getRelatedListings} from '@/redux/modules/relatedListings/selectors'
import {Shell, Body, Footer, Section} from '@/components/layout'
import Button from '@/components/shared/Button'
import Feed from '@/components/listings/Feed/Related'
import Listing from './Listing'

import GalleryScreen from '@/screens/modules/listing/Gallery'
import TourScreen from '@/screens/modules/listing/Tour'
import InterestFormScreen from '@/screens/modules/interest/Form'
import EditAddressScreen from '@/screens/modules/listingForm/Address'

class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {
    topBar: {
      backButtonTitle: ''
    }
  }

  get shareOptions() {
    const {
      id,
      type,
      address: {
        street,
        neighborhood,
        city,
        streetSlug,
        neighborhoodSlug,
        citySlug,
        stateSlug
      }
    } = this.props.listing.data
    return {
      url: `${FRONTEND_URL}/imoveis/${stateSlug}/${citySlug}/${neighborhoodSlug}/${streetSlug}/id-${id}`,
      message: `${type} na ${street}, ${neighborhood}, ${city}`
    }
  }

  updateNavigation() {
    const {listing: {data}, componentId} = this.props
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: data.price
            ? `R$${format.number(data.price)}`
            : 'Preço a definir'
        }
      }
    })
  }

  componentDidMount() {
    const {relatedListings, loadRelatedListings, params: {id}} = this.props
    if (_.isEmpty(relatedListings)) loadRelatedListings(id)
    else this.updateNavigation()
  }

  componentDidUpdate(prev) {
    const {listing: {data}} = this.props
    if (data && !_.isEqual(data, prev.listing.data)) this.updateNavigation()
  }

  navigateTo = (component) => () => {
    const {componentId, params} = this.props
    Navigation.push(componentId, {
      component: {
        ...component,
        passProps: {
          params: {...params, parentId: componentId}
        }
      }
    })
  }

  openModal = (idSuffix, component) => {
    const {params, componentId} = this.props
    const id = `${componentId}_${idSuffix}`
    Navigation.showModal({
      component: {
        ...component,
        id,
        passProps: {
          params,
          onDismiss: () => Navigation.dismissModal(id)
        }
      }
    })
  }

  onOpenGallery = () =>
    this.openModal('gallery', {
      name: GalleryScreen.screenName
    })

  onOpenTour = () =>
    this.openModal('tour', {
      name: TourScreen.screenName
    })

  onShare = async () => {
    const {logEvent, params: {id}} = this.props
    try {
      const {app} = await Share.open(this.shareOptions)
      logEvent('share_listing', {id, app})
    } catch (error) {
      /* User closed modal */
    }
  }

  onSelectListing = (id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })

  renderRelatedListings() {
    const {relatedListings} = this.props
    return <Feed data={relatedListings} onSelect={this.onSelectListing} />
  }

  renderFooter() {
    const {listing: {loading}, params} = this.props
    if (loading) return null
    return (
      <Button
        color="green"
        onPress={this.navigateTo({
          name: params.editing
            ? EditAddressScreen.screenName
            : InterestFormScreen.screenName
        })}
      >
        {params.editing ? 'Editar' : 'Marcar visita'}
      </Button>
    )
  }

  render() {
    const {listing: {data, loading}} = this.props

    return (
      <Shell>
        <Body scroll loading={loading}>
          {data && (
            <Listing
              {...data}
              onOpenGallery={this.onOpenGallery}
              onOpenTour={this.onOpenTour}
              onShare={this.onShare}
            />
          )}
          {data &&
            data.isActive && (
              <Section title="Veja Também">
                {this.renderRelatedListings()}
              </Section>
            )}
        </Body>
        {!this.isLoading && (
          <Footer style={{padding: 15}}>{this.renderFooter()}</Footer>
        )}
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state, {params}) => ({
      relatedListings: getRelatedListings(state, params)
    }),
    {loadRelatedListings, logEvent}
  ),
  withListing(({params: {id}}) => ({id}))
)(ListingScreen)
