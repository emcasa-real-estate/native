import {required, phone} from '@/lib/validations'
import TextInput from '@/components/shared/Form/TextInput'

export default function Phone({validations, ...props}) {
  return (
    <TextInput
      keyboardType="phone-pad"
      placeholder="Telefone"
      maxLength={16}
      validations={[].concat(validations, [
        required('O telefone é obrigatório'),
        phone()
      ])}
      {...props}
    />
  )
}

Phone.defaultProps = {
  value: ''
}
