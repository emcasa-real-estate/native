import _ from 'lodash'
import {PureComponent} from 'react'
import {connect, compose} from 'react-redux'
import {graphql} from 'react-apollo'

import {VISUALIZE_TOUR} from '@/lib/mutations/listings'
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
    return _.pick(this.props, ['data', 'loading'])
  }

  render() {
    return (
      <Loader
        children={this.props.children}
        onLoad={this.onLoad}
        {...this.status}
      />
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

export const withListing = connect(props, actions)

export const withMutations = graphql(VISUALIZE_TOUR, {
  options: ({id}) => ({
    variables: {id}
  }),
  props: ({mutate}) => ({
    onViewTour: () => mutate()
  })
})

export default compose(withListing, withMutations)(ListingLoader)
