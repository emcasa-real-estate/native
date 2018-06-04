import {required} from '@/lib/validations'
import TextInput from '@/components/shared/Form/TextInput'

export default function Password({validations, ...props}) {
  return (
    <TextInput
      secureTextEntry
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="Senha"
      validations={[].concat(validations, required('A senha é obrigatória'))}
      {...props}
    />
  )
}
