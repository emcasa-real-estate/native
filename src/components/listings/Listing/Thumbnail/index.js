import _ from 'lodash'
import {Component} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'

import BaseIcon from '@/components/shared/Icon'
import LikeIcon from '@/components/listings/LikeIcon'
import Matterport from '@/components/listings/Matterport'
import Image from '../../Image'
import styles, {iconColor} from './styles'

const ActionButton = ({children, title, onPress}) => (
  <View style={styles.button}>
    <TouchableOpacity
      accessible
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  </View>
)

const Icon = (props) => <BaseIcon size={20} color={iconColor} {...props} />

export default class ListingThumbnail extends Component {
  onOpenGallery = () => this.props.onOpenGallery()

  onOpenTour = () => {
    this.props.onOpenTour()
    this.props.onViewTour()
  }

  onViewTour = _.after(50, _.once(this.props.onViewTour))

  render() {
    const {
      testID,
      active,
      images,
      favorite,
      matterportCode,
      isActive,
      onFavorite
    } = this.props
    const image = images[0] || {}
    let {width, height} = Dimensions.get('window')
    height = width * 0.64

    return (
      <View style={styles.container} testID={testID}>
        <View
          onMoveShouldSetResponder={() => true}
          onStartShouldSetResponder={() => true}
          onResponderMove={this.onViewTour}
        >
          {active ? (
            <Matterport code={matterportCode} width={width} height={height}>
              <Image thumbnail {...image} width={width} height={height} />
            </Matterport>
          ) : (
            <View style={{width, height}} />
          )}
        </View>
        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            {isActive && (
              <ActionButton
                title={
                  favorite ? 'Adicionar aos favoritos' : 'Remover dos favoritos'
                }
                onPress={onFavorite}
              >
                <LikeIcon active={favorite} size={22} />
              </ActionButton>
            )}
          </View>
          <View style={styles.actionCell}>
            {images.length && (
              <ActionButton title="Ver imagens" onPress={this.onOpenGallery}>
                <Icon name="image" />
              </ActionButton>
            )}
            {matterportCode && (
              <ActionButton
                title="Ver em tela cheia"
                icon="fullscreen"
                onPress={this.onOpenTour}
              >
                <Icon name="expand" />
              </ActionButton>
            )}
          </View>
        </View>
      </View>
    )
  }
}
