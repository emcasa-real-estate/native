import _ from 'lodash'
import {PureComponent} from 'react'
import {View, ScrollView, TouchableOpacity, Image} from 'react-native'

import Icon from '@/components/shared/Icon'
import Header from './Header'
import styles, {iconColor} from './styles'

export default class CameraRollListPicker extends PureComponent {
  static defaultProps = {
    rowLength: 3
  }

  state = {
    layout: undefined,
    selected: []
  }

  get cellSize() {
    const {rowLength} = this.props
    const {layout} = this.state
    const cellPadding = 2.5
    if (!layout) return undefined
    return layout.width / rowLength - cellPadding * 2
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  onOpenModal = () => this.setState({showModal: true})

  onCloseModal = () => this.setState({showModal: false})

  onSubmit = () => this.props.onSelect(this.state.selected)

  onSelectImage = (i) => () =>
    this.setState(({selected}) => ({selected: [...selected, i]}))

  onDeselectImage = (i) => () =>
    this.setState(({selected}) => ({selected: _.without(selected, i)}))

  renderImage = ({uri}, i) => {
    const size = this.cellSize
    const isSelected = _.includes(this.state.selected, i)
    return (
      <TouchableOpacity
        key={uri}
        style={styles.cell}
        onPress={this[isSelected ? 'onDeselectImage' : 'onSelectImage'](i)}
      >
        {isSelected && (
          <View style={styles.icon}>
            <Icon name="check" color={iconColor} />
          </View>
        )}
        <Image
          style={styles.image}
          source={{uri}}
          style={{width: size, height: size}}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const {images, onDismiss} = this.props
    const {selected} = this.state

    return (
      <View style={styles.container}>
        <Header
          selectedCount={selected.length}
          onDismiss={onDismiss}
          onSubmit={this.onSubmit}
        />
        <ScrollView style={{flex: 1}}>
          <View style={styles.body} onLayout={this.onLayout}>
            {images.map(this.renderImage)}
          </View>
        </ScrollView>
      </View>
    )
  }
}
