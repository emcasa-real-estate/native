import {PureComponent} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {withProfileMutation} from '@/screens/account/shared/ProfileMutation'
import {withEmailMutation} from '@/screens/account/shared/EmailMutation'
import {isLoading} from '@/redux/modules/auth/selectors'
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

@connect((state) => ({loading: isLoading(state)}), null, null, {withRef: true})
@withProfileMutation
@withEmailMutation
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
