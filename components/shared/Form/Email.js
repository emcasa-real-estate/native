import {required, email} from '@/lib/validations'
import TextInput from '@/components/shared/Form/TextInput'

export default function Email({validations, value, ...props}) {
  return (
    <TextInput
      {...props}
      keyboardType="email-address"
      placeholder="Email"
      autoCapitalize="none"
      value={value.toLowerCase()}
      validations={[required('O email é obrigatório'), email()].concat(
        validations
      )}
    />
  )
}

Email.defaultProps = {
  value: ''
}
