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
    neighborhoodsSlugs: []
  }

  update() {
    const {neighborhoodsSlugs} = this.state
    this.props.updateFilters({neighborhoodsSlugs})
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
      neighborhoodsSlugs: getSearchFilters(state).neighborhoodsSlugs || []
    }),
    {
      updateState,
      updateFilters
    }
  ),
  withDistricts()
)(LocationContainer)
