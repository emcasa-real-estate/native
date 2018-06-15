import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getOptions} from '@/redux/modules/listings/feed/selectors'
import {getNeighborhoods} from '@/redux/modules/neighborhoods/selectors'
import {MultiSelectOptions} from '@/components/listings/Search/Field'

@connect((state) => ({
  neighborhoods: getNeighborhoods(state),
  options: getOptions(state, {type: 'search'})
}))
export default class NeighborhoodsScreen extends PureComponent {
  static screen = 'listings.Search.Neighborhoods'

  static defaultProps = {
    neighborhoods: [],
    options: {}
  }

  state = {
    value: undefined
  }

  constructor(props) {
    super(props)
    this.state.value = props.value
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange(value)
  }

  onReset = () => {
    this.setState({value: undefined})
    this.props.onChange(undefined)
  }

  get options() {
    const {neighborhoods} = this.props
    return neighborhoods.map((value) => ({label: value, value}))
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <MultiSelectOptions
          value={this.state.value}
          options={this.options}
          onChange={this.onChange}
        />
      </ScrollView>
    )
  }
}
