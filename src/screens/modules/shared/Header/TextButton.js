import _ from 'lodash'
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
import Icon from '@/components/shared/Icon'

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    zIndex: 0,
    color: colors.blue.medium,
    fontWeight: '500'
  },
  textLoading: {
    color: colors.gray.medium
  },
  icon: {
    marginLeft: 5
  }
})

export default class HeaderTextButton extends PureComponent {
  static screenName = 'shared.Header.TextButton'

  state = {}

  onLayout = _.once(({nativeEvent: {layout}}) =>
    this.setState({
      layout: {
        width: layout.width,
        height: layout.height
      }
    })
  )

  renderButton() {
    const {label, icon, style, loading} = this.props

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
          <View style={styles.row}>
            {label && (
              <Text style={[styles.text, loading && styles.textLoading, style]}>
                {label}
              </Text>
            )}
            {icon && (
              <Icon
                style={styles.icon}
                name={icon}
                size={17}
                color={colors.blue.medium}
              />
            )}
          </View>
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
