import {Component} from 'react'
import {View} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'

import Icon from '@/components/shared/Icon'
import {withOrientation} from '@/containers/shared/Orientation/Provider/Context'
import Image from '../Image'
import styles from './styles'

@withOrientation
export default class ListingGallery extends Component {
  static defaultProps = {
    paginationDelta: 2
  }

  state = {
    position: 0
  }

  onChange = (position) => this.setState({position: Math.floor(position)})

  onLayout = (e) => {
    const {dimensions} = this.props
    const {position} = this.state
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
    const {position} = this.state
    const {dimensions} = this.props
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
    const {dimensions} = this.props
    return (
      <View style={[styles.container, dimensions]}>
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
