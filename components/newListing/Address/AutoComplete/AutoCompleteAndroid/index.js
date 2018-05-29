import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback, TextInput, Modal} from 'react-native'

import AutoComplete from '../AutoComplete'
import styles from './styles'

export default class AutoCompleteAndroid extends PureComponent {
  state = {
    active: false,
    value: null,
    layout: null
  }

  inputButton = React.createRef()
  inputButtonText = React.createRef()
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

  onChangeComplete = () => {
    requestAnimationFrame(() => this.inputButtonText.current.focus())
    this.onHideModal()
  }

  get modalLayout() {
    const {layout} = this.state
    if (!layout) return undefined
    const {width, pageX, pageY} = layout
    return {
      width,
      marginLeft: pageX,
      marginRight: pageX,
      top: pageY,
      flex: 1
    }
  }

  render() {
    const {active, value} = this.state

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onShowModal}>
          <View ref={this.inputButton} style={styles.textInputContainer}>
            <TextInput
              caretHidden
              ref={this.inputButtonText}
              style={[styles.textInput, styles.textInputButton]}
              editable={false}
              value={value}
              placeholder={this.props.placeholder}
              selection={{start: 0, end: 0}}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal transparent visible={active} onRequestClose={this.onHideModal}>
          <TouchableWithoutFeedback
            style={{width: '100%', height: '100%'}}
            onPress={this.onHideModal}
          >
            <View style={{flex: 1}}>
              <View style={this.modalLayout}>
                <AutoComplete
                  ref={this.autoComplete}
                  styles={styles}
                  onChangeText={this.onChangeText}
                  onChangeComplete={this.onChangeComplete}
                  {...this.props}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}
