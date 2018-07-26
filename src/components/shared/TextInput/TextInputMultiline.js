import {PureComponent} from 'react'
import {View, TextInput, Platform} from 'react-native'

export default class MultilineTextInput extends PureComponent {
  static defaultProps = {
    maxHeight: 50 * 4,
    minHeight: 50
  }

  state = {
    layout: {height: 0},
    inputLayout: {}
  }

  static getDerivedStateFromProps({minHeight}, {layout}) {
    if (minHeight <= layout.height) return null
    return {
      layout: {
        ...layout,
        height: Math.max(minHeight, layout.height)
      }
    }
  }

  onContentSizeChange = ({nativeEvent: {contentSize}}) => {
    const {maxHeight, minHeight, center} = this.props
    const {max, min} = Math
    const height = min(maxHeight, max(minHeight, contentSize.height))
    const layout = {height}
    const inputLayout = {maxHeight: height}
    if (center && Platform.OS === 'ios')
      layout.paddingTop = max(0, (height - contentSize.height - 15) / 2)
    else if (Platform.OS == 'android')
      inputLayout.textAlignVertical = center ? 'center' : 'top'
    this.setState({layout, inputLayout})
  }

  render() {
    const {styles, style, inputRef, ...props} = this.props
    const {layout, inputLayout} = this.state

    return (
      <View style={styles.container.concat(style, layout)}>
        <TextInput
          ref={inputRef}
          style={styles.input.concat(inputLayout)}
          underlineColorAndroid="rgba(0,0,0,0)"
          onContentSizeChange={this.onContentSizeChange}
          {...props}
        />
      </View>
    )
  }
}
