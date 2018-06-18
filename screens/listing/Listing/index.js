import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import Shell, {Body, Footer, Section} from '@/components/shared/Shell'
import Button from '@/components/shared/Button'
import Listing from '@/components/listings/Listing'
// import RelatedListings from '@/containers/listings/Feed/Related'

@connect((state, {params}) => ({
  data: getData(state, params) || {},
  loading: isLoading(state, params)
}))
export default class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {}

  updateNavigation() {
    const {data, componentId} = this.props
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {text: data.price}
      }
    })
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
          {!loading && (
            <Listing
              {...data}
              onViewTour={() => null}
              onFavorite={() => null}
            />
          )}
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

export const screen = ListingScreen
