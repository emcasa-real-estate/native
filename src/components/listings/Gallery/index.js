import {Component} from 'react'
import {View} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'

import Icon from '@/components/shared/Icon'
import Image from '../Image'
import styles from './styles'

export default class ListingGallery extends Component {
  static defaultProps = {
    paginationDelta: 2
  }

  state = {
    position: 0,
    dimensions: {}
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

  get items() {
    return this.props.children
  }

  galleryRef = (node) => {
    this.gallery = node
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
    const {dimensions, position} = this.state
    // Placeholder
    if (Math.abs(index - position) > 2)
      return <View key={image.id} style={dimensions} />
    return (
      <Image
        style={styles.image}
        layout="scalable"
        key={image.id}
        width={800}
        height={650}
        {...image}
      />
    )
  }

  render() {
    const {dimensions} = this.state
    return (
      <View style={[styles.container, dimensions]} onLayout={this.onLayout}>
        <SwipeableView
          ref={this.galleryRef}
          onLayout={this.onLayout}
          style={styles.gallery}
          onChangeIndex={this.onChange}
        >
          {this.items.map(this.renderImage)}
        </SwipeableView>
        <View style={styles.pagination}>
          {this.items.map(this.renderPagination)}
        </View>
      </View>
    )
  }
}
