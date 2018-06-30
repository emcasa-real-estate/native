import {PureComponent} from 'react'
import {View, Modal, TouchableOpacity, ActivityIndicator} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {iconColor} from './styles'
import Options from './Options'

export default class GalleryImagePicker extends PureComponent {
  state = {
    showModal: false
  }

  get loading() {
    const {progress} = this.props
    return progress && progress[0] / progress[1] < 1
  }

  onOpenModal = () => this.setState({showModal: true})

  onCloseModal = () => this.setState({showModal: false})

  renderButton() {
    return (
      <TouchableOpacity onPress={this.onOpenModal}>
        <View style={[styles.button, styles.flexContainer]}>
          <Icon
            name="plus"
            color={iconColor}
            stroke={iconColor}
            size={23}
            strokeWidth={20}
          />
          <Text style={styles.buttonText}>Adicionar foto</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderProgress() {
    const {progress} = this.props

    return (
      <View style={[styles.button, styles.buttonLoading, styles.flexContainer]}>
        <Text style={[styles.buttonText, styles.buttonTextLoading]}>
          Subindo fotos {progress[0]}/{progress[1]}
        </Text>
        <ActivityIndicator
          style={styles.activityIndicator}
          color="white"
          size="large"
        />
      </View>
    )
  }

  render() {
    const {onPickImage} = this.props
    const {showModal} = this.state
    const loading = this.loading

    return (
      <View style={styles.container}>
        {loading ? this.renderProgress() : this.renderButton()}
        <Modal
          transparent
          animationType="slide"
          visible={showModal}
          onRequestClose={this.onCloseModal}
        >
          <Options onPickImage={onPickImage} onDismiss={this.onCloseModal} />
        </Modal>
      </View>
    )
  }
}
