import {PureComponent} from 'react'

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
      <AutoComplete
        styles={styles}
        listViewDisplayed={this.state.active}
        textInputProps={{
          onBlur: this.onHideResults,
          onFocus: this.onShowResults
        }}
        {...this.props}
      />
    )
  }
}
