import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withDistricts} from '@/graphql/containers'
import Location from '@/components/listings/Search/Location'

import {updateState, updateFilters} from './module'
import {getSearchState, getSearchFilters} from './module/selectors'

class LocationContainer extends PureComponent {
  state = {
    neighborhoodSlugs: []
  }

  update() {
    const {neighborhoodSlugs} = this.state
    this.props.updateFilters({neighborhoodSlugs})
  }

  /*
  static getDerivedStateFromProps({neighborhoodSlugs}, state) {
    if (_.isEqual(neighborhoodSlugs, state.neighborhoodSlugs)) return null
    return {neighborhoodSlugs}
  }
  */

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.neighborhoodSlugs, this.props.neighborhoodSlugs)) {
      this.setState({neighborhoodSlugs: this.props.neighborhoodSlugs})
    }
    if (!_.isEqual(prev.visible, this.props.visible) && !this.props.visible) {
      this.update()
    }
  }

  onChangeState = (stateSlug) => this.props.updateState({stateSlug})

  onChangeNeighborhoods = (neighborhoodSlugs) =>
    this.setState({neighborhoodSlugs})

  render() {
    const {stateSlug, districts, ...props} = this.props
    const {neighborhoodSlugs} = this.state
    return (
      <Location
        {...props}
        districts={districts.data || []}
        selectedState={stateSlug}
        selectedNeighborhoods={neighborhoodSlugs}
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
      neighborhoodSlugs: getSearchFilters(state).neighborhoodSlugs || []
    }),
    {
      updateState,
      updateFilters
    }
  ),
  withDistricts()
)(LocationContainer)
