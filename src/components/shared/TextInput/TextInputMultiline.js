import _ from 'lodash'
import {PureComponent} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

export default class TextInputAndroid extends PureComponent {
  static defaultProps = {
    maxHeight: 50 * 4,
    minHeight: 50
  }

  state = {
    layout: {height: 0}
  }

  onContentSizeChange = ({nativeEvent: {contentSize}}) => {
    const {maxHeight, minHeight} = this.props
    this.setState({
      layout: {
        height: Math.min(maxHeight, Math.max(minHeight, contentSize.height))
      }
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
