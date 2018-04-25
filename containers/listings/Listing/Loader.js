import _ from 'lodash'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {graphql, compose, Mutation} from 'react-apollo'

import {
  FAVORITE,
  UNFAVORITE,
  VISUALIZE_TOUR
} from '@/lib/graphql/mutations/listings'
import {GET_FAVORITE_LISTINGS_IDS} from '@/lib/graphql/queries/favorites'
import {load} from '@/redux/modules/listings/data'
import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import Loader from '@/containers/shared/Loader'

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
    const {data: {id}, favorite} = this.props

    return (
      <Mutation mutation={favorite ? UNFAVORITE : FAVORITE}>
        {(onFavorite) => (
          <Loader
            children={this.props.children}
            onLoad={this.onLoad}
            onViewTour={this.onViewTour}
            onFavorite={() =>
              onFavorite({
                refetchQueries: [{query: GET_FAVORITE_LISTINGS_IDS}],
                variables: {id}
              })
            }
            {...this.status}
          />
        )}
      </Mutation>
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

const withRestData = connect(props, actions)

const withGqlData = graphql(GET_FAVORITE_LISTINGS_IDS, {
  props: ({data, ownProps: {id}}) => ({
    favorite:
      data.favoritedListings &&
      data.favoritedListings.findIndex((fav) => fav.id == id) !== -1
  })
})

const withMutations = graphql(VISUALIZE_TOUR, {
  options: ({id}) => ({
    variables: {id}
  }),
  props: ({mutate}) => ({
    onViewTour: () => mutate()
  })
})

export const withListing = compose(withGqlData, withMutations, withRestData)

export default withListing(ListingLoader)
