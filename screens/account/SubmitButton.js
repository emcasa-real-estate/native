import {PureComponent} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {getContext} from '@/screens/module/context/selectors'
import TextButton from '@/screens/shared/Header/TextButton'

const styles = StyleSheet.create({
  container: {
    position: 'relative'
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
  button: {
    zIndex: 0
  }
})

@connect((state) => getContext(state, {screen: 'account'}), null, null, {
  withRef: true
})
export default class AccountHeaderButton extends PureComponent {
  static screenName = 'account.HeaderButton'

  render() {
    const {loading, onPress} = this.props

    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.indicator}>
            <ActivityIndicator />
          </View>
        )}
        <View style={styles.button}>
          <TextButton label="Salvar" onPress={loading ? undefined : onPress} />
        </View>
      </View>
    )
  }
}
