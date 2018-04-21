import {required, phone} from '@/lib/validations'
import TextInput from '@/components/shared/TextInput'
import {field} from './Field'

function Phone({onChange, ...props}) {
  return (
    <TextInput
      keyboardType="phone-pad"
      placeholder="Telefone"
      onChangeText={onChange}
      {...props}
    />
  )
}

export default field({
  validations: [required('O telefone é obrigatório'), phone()]
})(Phone)
