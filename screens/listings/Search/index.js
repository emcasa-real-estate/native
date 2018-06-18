import _ from 'lodash'
import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {updateOptions} from '@/redux/modules/listings/feed'
import {getOptions} from '@/redux/modules/listings/feed/selectors'
import Form from '@/components/listings/Search/Form'
import HeaderButton from '@/screens/shared/Header/TextButton'
import Neighborhoods from './Neighborhoods'

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

  state = {
    options: {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      options: {
        ...props.options,
        ...state.options
      }
    }
  }

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        translucent: true,
        drawBehind: true,
        visible: false
      }
    })
  }

  componentDidAppear() {
    const {componentId} = this.props
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${componentId}_resetButton`,
            passProps: {
              label: 'Limpar',
              onPress: this.onReset
            },
            component: {name: HeaderButton.screenName}
          }
        ]
      }
    })
  }

  componentDidDisappear() {
    const {updateOptions} = this.props
    const {options} = this.state
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
