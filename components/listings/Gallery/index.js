import {Component} from 'react'
import {View} from 'react-native'
import SwipeableView from 'react-swipeable-views-native/lib/SwipeableViews.scroll'

import Icon from '@/components/shared/Icon'
import {withOrientation} from '@/containers/shared/Orientation/Provider/Context'
import Image from '../Image'
import styles from './styles'

@withOrientation
export default class ListingGallery extends Component {
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

  renderPagination() {
    const {position} = this.state

    return this.items.map((image, index) => (
      <Icon
        key={image.id}
        type="solid"
        name="circle"
        color="white"
        size={position === index ? 14 : 10}
      />
    ))
  }

  renderImage = (image, index) => {
    const {position} = this.state
    const {dimensions} = this.props
    // Placeholder
    if (Math.abs(index - position) > 2)
      return <View key={image.id} style={dimensions} />
    return (
      <Image
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
        <View style={styles.pagination}>{this.renderPagination()}</View>
      </View>
    )
  }
}
