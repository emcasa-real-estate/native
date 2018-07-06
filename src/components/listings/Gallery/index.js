import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'

import Image from '../Image'
import Pagination from './Pagination'
import styles from './styles'

export default class ListingGallery extends PureComponent {
  static defaultProps = {
    paginationDelta: 2
  }

  state = {
    position: 0,
    dimensions: {}
  }

  get items() {
    return this.props.children
  }

  get layout() {
    const {width, height} = this.props
    const {dimensions} = this.state
    return _.defaults({width, height}, dimensions)
  }

  get imageLayout() {
    const {inline} = this.props
    const layout = this.layout
    if (!inline) layout.height = layout.width * 0.6
    return layout
  }

  galleryRef = (node) => {
    this.gallery = node
  }

  onChange = (position) => this.setState({position: Math.floor(position)})

  onLayout = (e) => {
    const {position} = this.state
    const {nativeEvent: {layout}} = e
    const dimensions = {
      width: layout.width,
      height: layout.height
    }
    this.setState({dimensions})
    this.gallery.handleLayout(e)
    this.gallery.scrollViewNode.scrollTo({
      x: dimensions.width * position,
      y: 0,
      animated: false
    })
  }

  renderPagination = (image, index) => {
    let {position} = this.state
    const {paginationDelta} = this.props
    let right = position + paginationDelta
    let left = position - paginationDelta
    if (left < 0) right -= left
    if (right >= this.items.length)
      left = this.items.length - paginationDelta * 2 - 1
    if (index < left || index > right) return null
    const distanceFromActivePage = Math.min(
      paginationDelta,
      Math.abs(index - position)
    )
    const size = 12 / (distanceFromActivePage + 1) + 2
    const opacity = 0.6 / (distanceFromActivePage + 1) + 0.4
    return (
      <Icon
        key={image.id}
        type="solid"
        name="circle"
        color="white"
        size={size}
        style={[styles.pageIcon, {opacity}]}
      />
    )
  }

  renderImage = (image, index) => {
    const {scalable} = this.props
    const {position} = this.state
    // Placeholder
    if (Math.abs(index - position) > 1)
      return <View key={image.id} style={this.imageLayout} />
    return (
      <Image
        style={[styles.image]}
        layout={scalable ? 'scalable' : undefined}
        key={image.id}
        {...this.imageLayout}
        {...image}
      />
    )
  }

  render() {
    const {inline} = this.props
    const {position} = this.state
    return (
      <View style={[styles.container, this.layout]} onLayout={this.onLayout}>
        <SwipeableView
          ref={this.galleryRef}
          onLayout={this.onLayout}
          style={styles.gallery}
          slideStyle={styles.slide}
          onChangeIndex={this.onChange}
        >
          {this.items.map(this.renderImage)}
        </SwipeableView>
        <View style={styles.pagination}>
          <Pagination
            displayText={!inline}
            currentPosition={position}
            totalPages={this.items.length}
          />
        </View>
      </View>
    )
  }
}
