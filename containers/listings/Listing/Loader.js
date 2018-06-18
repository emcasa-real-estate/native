import _ from 'lodash'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import {compose, mapProps} from 'recompose'

import {VISUALIZE_TOUR} from '@/graphql/modules/listings/mutations'
import {load} from '@/redux/modules/listings/data'
import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import Loader from '@/containers/shared/Loader'
import FavoritesMutation from '@/containers/listings/FavoritesMutation'
import {withFavoriteListingIDs} from '@/containers/listings/FavoritesQuery'

export class ListingLoader extends PureComponent {
  state = {
    visualizedTour: false
  }

  onLoad = () => {
    const {load, id} = this.props
    load(id)
  }

  onViewTour = () => {
    if (!this.state.visualizedTour) {
      this.setState({visualizedTour: true})
      this.props.onViewTour()
    }
  }

  get status() {
    return _.pick(this.props, ['data', 'loading', 'favorite'])
  }

  render() {
    const {id, favorite} = this.props

    return (
      <FavoritesMutation id={id} favorite={favorite}>
        {(onFavorite) => (
          <Loader
            children={this.props.children}
            onLoad={this.onLoad}
            onViewTour={this.onViewTour}
            onFavorite={() => onFavorite()}
            {...this.status}
          />
        )}
      </FavoritesMutation>
    )
  }
}

const props = (...args) => ({
  data: getData(...args),
  loading: isLoading(...args)
})

const actions = {
  load
}

export const withRestData = connect(props, actions)

export const withGqlData = compose(
  withFavoriteListingIDs,
  mapProps(({favorites, ...props}) => ({
    ...props,
    favorite:
      favorites.data &&
      favorites.data.findIndex((fav) => fav.id == props.id) !== -1
  }))
)

export const withMutations = graphql(VISUALIZE_TOUR, {
  options: ({id}) => ({
    variables: {id}
  }),
  props: ({mutate}) => ({
    onViewTour: () => mutate()
  })
})

export const withListing = compose(withGqlData, withMutations, withRestData)

export default withListing(ListingLoader)
