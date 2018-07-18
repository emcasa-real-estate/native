import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getSearchFilters} from '@/screens/modules/listings/Search/module/selectors'
import {getNeighborhoods} from '@/redux/modules/neighborhoods/selectors'
import {MultiSelectOptions} from '@/components/listings/Search/Field'
import HeaderButton from '@/screens/modules/shared/Header/TextButton'

class NeighborhoodsScreen extends PureComponent {
  static screenName = 'listings.Search.Neighborhoods'

  static options = {
    topBar: {
      title: {text: 'Bairros'}
    }
  }

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

  componentDidAppear() {
    const {componentId} = this.props
    const buttonProps = {
      label: 'Limpar',
      onPress: this.onReset
    }
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${componentId}_resetButton`,
            passProps: buttonProps,
            component: {name: HeaderButton.screenName, passProps: buttonProps}
          }
        ]
      }
    })
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

export default connect(
  (state) => ({
    neighborhoods: getNeighborhoods(state),
    options: getSearchFilters(state)
  }),
  null,
  null,
  {withRef: true}
)(NeighborhoodsScreen)
