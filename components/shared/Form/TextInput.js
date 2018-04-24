import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

export default field()(({onChange, ...props}) => (
  <TextInput {...props} onChangeText={onChange} />
))
