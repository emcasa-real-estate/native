import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withDistricts} from '@/graphql/containers'
import Location from '@/components/listings/SearchLocation'

import {updateState, updateFilters} from '@/redux/modules/search'
import {
  getSearchState,
  getSearchFilters
} from '@/redux/modules/search/selectors'

class LocationContainer extends PureComponent {
  state = {
    neighborhoodsSlugs: undefined
  }

  update() {
    const {neighborhoodsSlugs} = this.state
    this.props.updateFilters({
      ...this.props.filters,
      neighborhoodsSlugs
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.neighborhoodsSlugs && props.filters)
      return {
        neighborhoodsSlugs: props.filters.neighborhoodsSlugs || []
      }
    return null
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.visible, this.props.visible) && !this.props.visible) {
      this.update()
    }
  }

  onChangeState = (stateSlug) => {
    const nextState = {}
    if (stateSlug !== this.props.stateSlug) nextState.neighborhoodsSlugs = []
    this.setState(nextState, () => this.props.updateState(stateSlug))
  }

  onChangeNeighborhoods = (neighborhoodsSlugs) =>
    this.setState({neighborhoodsSlugs})

  render() {
    const {stateSlug, districts, ...props} = this.props
    const {neighborhoodsSlugs} = this.state
    return (
      <Location
        {...props}
        districts={districts.data || []}
        selectedState={stateSlug}
        selectedNeighborhoods={neighborhoodsSlugs}
        onChangeState={this.onChangeState}
        onChangeNeighborhoods={this.onChangeNeighborhoods}
      />
    )
  }
}

export default compose(
  connect(
    (state) => ({
      stateSlug: getSearchState(state),
      filters: getSearchFilters(state)
    }),
    {
      updateState,
      updateFilters
    }
  ),
  withDistricts()
)(LocationContainer)
