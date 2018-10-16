import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Share from 'react-native-share'
import {connect} from 'react-redux'

import {FRONTEND_URL} from '@/config/const'
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

class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {
    topBar: {
      backButton: {title: ''}
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
    const {
      listing: {data},
      componentId
    } = this.props
    if (!data) return
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
    const {
      listing: {data},
      relatedListings,
      loadRelatedListings,
      params: {id}
    } = this.props
    if (_.isEmpty(relatedListings)) loadRelatedListings(id)
    if (data) this.updateNavigation()
  }

  componentDidUpdate(prev) {
    const {
      listing: {data}
    } = this.props
    if (data && !_.isEqual(data, prev.listing.data)) this.updateNavigation()
  }

  navigateTo = (component, params = this.props.params) => () => {
    const {componentId} = this.props
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
    const {
      logEvent,
      params: {id}
    } = this.props
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
    return (
      <View style={{flexDirection: 'row'}}>
        <Button
          color="green"
          style={{flex: 1}}
          onPress={this.navigateTo({name: InterestFormScreen.screenName})}
        >
          Marcar visita
        </Button>
      </View>
    )
  }

  render() {
    const {
      listing: {data, loading}
    } = this.props

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
        {!loading && (
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
