import {PureComponent} from 'react'

import State from './State'
import Neighborhoods from './Neighborhoods'

export default class LocationSearchForm extends PureComponent {
  state = {
    selectedView: 'state'
  }

  switchView = (key) => this.setState({selectedView: key})

  onChangeState = (value) => {
    if (this.props.onChangeState) this.props.onChangeState(value)
    this.switchView('neighborhoods')
  }

  onChangeNeighborhoods = (value) =>
    this.props.onChangeNeighborhoods && this.props.onChangeNeighborhoods(value)

  render() {
    const {districts, selectedState, selectedNeighborhoods} = this.props
    const {selectedView} = this.state

    switch (selectedView) {
      case 'state':
        return <State value={selectedState} onChange={this.onChangeState} />
      case 'neighborhoods':
        return (
          <Neighborhoods
            districts={districts}
            value={selectedNeighborhoods}
            onChange={this.onChangeNeighborhoods}
            onDismiss={() => this.switchView('state')}
          />
        )
      default:
        return null
    }
  }
}
