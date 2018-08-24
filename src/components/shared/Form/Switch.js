import {Switch} from 'react-native'
import {field} from './Field'

const SwitchField = field()(({onChange, ...props}) => (
  <Switch {...props} onValueChange={onChange} />
))

SwitchField.defaultProps = {
  value: false
}

export default SwitchField
