import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback, Modal} from 'react-native'

import {required} from '@/lib/validations'
import {field} from '@/components/shared/Form/Field'
import Text from '@/components/shared/Text'
import AutoCompleteModal from './Modal'
import styles from './styles'

@field({validations: [required('O endereço é obrigatório')]})
export default class AutoComplete extends PureComponent {
  state = {
    active: false,
    value: null,
    layout: null
  }

  inputButton = React.createRef()
  autoComplete = React.createRef()

  onShowModal = () =>
    this.inputButton.current.measure((_, __, width, height, pageX, pageY) =>
      this.setState(
        {
          active: true,
          layout: {
            width,
            height,
            pageX,
            pageY
          }
        },
        () => {
          requestAnimationFrame(() => this.autoComplete.current.input.focus())
        }
      )
    )

  onHideModal = () => this.setState({active: false})

  onChangeText = (value) => {
    this.setState({value})
  }

  get modalLayout() {
    const {layout} = this.state
    if (!layout) return undefined
    const {width, pageX, pageY} = layout
    return {
      width,
      left: pageX,
      top: pageY,
      flexGrow: 1
    }
  }

  render() {
    const {active, value} = this.state

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onShowModal}>
          <View ref={this.inputButton} style={styles.textInputContainer}>
            <Text style={styles.textInput}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Modal transparent visible={active} onRequestClose={this.onHideModal}>
          <TouchableWithoutFeedback onPress={this.onHideModal}>
            <View style={this.modalLayout}>
              <AutoCompleteModal
                ref={this.autoComplete}
                onChangeText={this.onChangeText}
                {...this.props}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}
