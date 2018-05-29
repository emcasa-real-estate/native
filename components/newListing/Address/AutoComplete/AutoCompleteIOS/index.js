import {PureComponent, Fragment} from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'

import AutoComplete from '../AutoComplete'
import styles from './styles'

export default class AutoCompleteIOS extends PureComponent {
  state = {
    active: false
  }

  onShowResults = () => this.setState({active: true})

  onHideResults = () => this.setState({active: false})

  render() {
    return (
      <Fragment>
        <AutoComplete
          styles={styles}
          listViewDisplayed={this.state.active}
          textInputProps={{
            onBlur: this.onHideResults,
            onFocus: this.onShowResults
          }}
          {...this.props}
        />
        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={this.onPress}
        >
          <View style={styles.touchable} />
        </TouchableWithoutFeedback>
      </Fragment>
    )
  }
}
