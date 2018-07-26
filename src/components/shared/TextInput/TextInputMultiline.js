import {PureComponent} from 'react'
import {View, TextInput, Platform} from 'react-native'

export default class MultilineTextInput extends PureComponent {
  static defaultProps = {
    maxHeight: 50 * 4,
    minHeight: 50
  }

  state = {
    layout: {height: 0}
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
    let paddingTop = 0
    if (center && Platform.OS === 'ios')
      paddingTop = max(0, (height - contentSize.height - 15) / 2)
    this.setState({
      layout: {height, paddingTop}
    })
  }

  render() {
    const {styles, style, inputRef, ...props} = this.props
    const {layout} = this.state

    return (
      <View style={styles.container.concat(style, layout)}>
        <TextInput
          ref={inputRef}
          style={styles.input.concat({maxHeight: layout.height})}
          underlineColorAndroid="rgba(0,0,0,0)"
          onContentSizeChange={this.onContentSizeChange}
          {...props}
        />
      </View>
    )
  }
}
