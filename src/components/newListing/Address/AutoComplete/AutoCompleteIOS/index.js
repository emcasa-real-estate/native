import {PureComponent} from 'react'

import AutoComplete from '../AutoComplete'
import styles from './styles'

export default class AutoCompleteIOS extends PureComponent {
  render() {
    return <AutoComplete styles={styles} {...this.props} />
  }
}
