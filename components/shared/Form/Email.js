import {required, email} from '@/lib/validations'
import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

export default field({
  validations: [required('O email é obrigatório'), email()]
})(({onChange, valid, value, ...props}) => (
  <TextInput
    {...props}
    invalid={!valid}
    keyboardType="email-address"
    placeholder="Email"
    autoCapitalize="none"
    value={value.toLowerCase()}
    onChangeText={onChange}
  />
))
