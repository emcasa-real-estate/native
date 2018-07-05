import _ from 'lodash'
import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {updateOptions} from '@/redux/modules/listings/feed'
import {getOptions} from '@/redux/modules/listings/feed/selectors'
import Form from '@/components/listings/Search/Form'
import HeaderButton from '@/screens/modules/shared/Header/TextButton'
import Neighborhoods from './Neighborhoods'

const defaultValue = {
  neighborhoods: [],
  types: ['Casa', 'Apartamento', 'Cobertura'],
  price: {min: undefined, max: undefined},
  area: {min: undefined, max: undefined},
  rooms: {min: undefined, max: undefined},
  garage_spots: {min: undefined, max: undefined}
}

const compareDefaults = (value, defaultValue) => {
  if (_.isArray(value) && _.isArray(defaultValue))
    return !_.isEqual(value.sort(), defaultValue.sort())
  else if (typeof value !== 'undefined') return !_.isEqual(value, defaultValue)
  else return false
}

@connect(
  (state) => ({
    options: getOptions(state, {type: 'search'})
  }),
  {updateOptions: updateOptions('search')},
  null,
  {withRef: true}
)
export default class ListingSearchScreen extends PureComponent {
  static screenName = 'listings.Search'

  static options = {
    topBar: {
      title: {text: 'Filtrar busca'}
    }
  }

  defaultValue = {}

  state = {
    options: this.defaultValue
  }

  static getDerivedStateFromProps(props, state) {
    return {
      options: {
        ...defaultValue,
        ...props.options,
        ...state.options
      }
    }
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

  componentDidDisappear() {
    const {updateOptions} = this.props
    const options = _.pickBy(this.state.options, (value, key) =>
      compareDefaults(value, defaultValue[key])
    )
    if (!_.isEqual(options, this.props.options)) updateOptions(options)
  }

  onChange = (params) => this.setState({options: params})

  onChangeNeighborhoods = (neighborhoods) =>
    this.setState(({options}) => ({
      options: {
        ...options,
        neighborhoods
      }
    }))

  onReset = () => this.setState({options: {}})

  onPressNeighborhoods = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: Neighborhoods.screenName,
        passProps: {
          value: this.state.options.neighborhoods,
          onChange: this.onChangeNeighborhoods
        }
      }
    })
  }

  render() {
    const {options} = this.state

    return (
      <ScrollView style={{flex: 1}}>
        <Form
          onChange={this.onChange}
          onPressNeighborhoods={this.onPressNeighborhoods}
          value={options}
        />
      </ScrollView>
    )
  }
}
