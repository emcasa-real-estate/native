import {required} from '@/lib/validations'
import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

export default field({
  validations: [required('A senha é obrigatória')]
})(({onChange, valid, ...props}) => (
  <TextInput
    {...props}
    secureTextEntry
    invalid={!valid}
    placeholder="Senha"
    onChangeText={onChange}
  />
))
