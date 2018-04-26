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

export function FavoritesMutation({children, id, favorite}) {
  return (
    <Mutation
      mutation={favorite ? UNFAVORITE : FAVORITE}
      variables={{id}}
      refetchQueries={[{query: GET_FAVORITE_LISTINGS_IDS}]}
    >
      {children}
    </Mutation>
  )
}

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

export const withGqlData = graphql(GET_FAVORITE_LISTINGS_IDS, {
  props: ({data, ownProps: {id}}) => ({
    favorite:
      data.favoritedListings &&
      data.favoritedListings.findIndex((fav) => fav.id == id) !== -1
  })
})

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
