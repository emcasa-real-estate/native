import {PureComponent} from 'react'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native'

import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    paddingRight: Platform.OS === 'android' ? 15 : 0
  },
  indicator: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: 0,
    width: 30,
    marginLeft: -15,
    zIndex: 1
  },
  text: {
    zIndex: 0,
    color: colors.blue.medium,
    fontWeight: '500'
  },
  textLoading: {
    color: colors.gray.medium
  }
})

export default class HeaderTextButton extends PureComponent {
  static screenName = 'shared.Header.TextButton'

  state = {}

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState({
      layout: {
        width: layout.width,
        height: layout.height
      }
    })

  renderButton() {
    const {label, style, loading} = this.props

    return (
      <View>
        <View
          style={[styles.container, this.state.layout]}
          onLayout={this.onLayout}
        >
          {loading && (
            <View style={styles.indicator}>
              <ActivityIndicator />
            </View>
          )}
          <Text style={[styles.text, loading && styles.textLoading, style]}>
            {label}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const {loading, onPress} = this.props

    if (!onPress || loading) return this.renderButton()
    return (
      <TouchableOpacity onPress={onPress}>
        {this.renderButton()}
      </TouchableOpacity>
    )
  }
}
