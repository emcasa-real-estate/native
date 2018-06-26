import React, {PureComponent} from 'react'
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Dimensions,
  PixelRatio
} from 'react-native'

import AutoComplete from '../AutoComplete'
import styles from './styles'

export default class AutoCompleteAndroid extends PureComponent {
  state = {
    active: false,
    layout: null
  }

  inputButton = React.createRef()
  inputButtonText = React.createRef()
  autoComplete = React.createRef()

  get text() {
    if (!this.autoComplete.current) return ''
    return this.autoComplete.current.text
  }

  onShowModal = () =>
    this.inputButton.current.measure((x, y, width, height, pageX, pageY) =>
      this.setState(
        {
          active: true,
          layout: {
            x,
            y,
            width,
            height,
            pageX,
            pageY
          }
        },
        () => {
          requestAnimationFrame(() => this.autoComplete.current.focus())
        }
      )
    )

  onHideModal = async () => {
    await this.autoComplete.current.selectBestMatch()
    await new Promise((resolve) => setTimeout(resolve, 500))
    await this.autoComplete.current.awaitRequests()
    requestAnimationFrame(() => this.setState({active: false}))
  }

  onChangeComplete = () => {
    requestAnimationFrame(() => {
      this.inputButtonText.current.focus()
      this.setState({active: false})
    })
  }

  get modalLayout() {
    const {layout} = this.state
    if (!layout) return undefined
    const windowLayout = Dimensions.get('window')
    const {width, height, pageX, pageY} = layout
    const offsetBottom = windowLayout.height - pageY - height
    return {
      width,
      marginLeft: pageX,
      marginRight: pageX,
      top:
        PixelRatio.roundToNearestPixel(windowLayout.height - offsetBottom) - 7,
      flex: 1
    }
  }

  render() {
    const {active} = this.state

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onShowModal}>
          <View ref={this.inputButton} style={styles.textInputContainer}>
            <TextInput
              caretHidden
              ref={this.inputButtonText}
              style={[styles.textInput, styles.textInputButton]}
              editable={false}
              value={this.text}
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
