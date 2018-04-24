import {required} from '@/lib/validations'
import Text from '@/components/shared/Text'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Password from '@/components/shared/Form/Password'
import TextInput from '@/components/shared/TextInput'
import {field} from '@/components/shared/Form/Field'
import styles from './styles'

const getError = (error) => {
  if (!error) return undefined
  switch (error.status) {
    case 422:
      return 'Esse e-mail já está em uso.'
    default:
      return 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
  }
}

const Name = field({validations: [required('O nome é obrigatório')]})(
  ({onChange, ...props}) => (
    <TextInput
      style={styles.input}
      placeholder="Nome"
      onChangeText={onChange}
      {...props}
    />
  )
)

export default function SignUpForm({onSubmit, error}) {
  const errorMessage = getError(error)
  return (
    <Form style={styles.container} onSubmit={onSubmit}>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Name name="name" placeholder="Nome" />
      <Email name="email" />
      <Password name="password" />
    </Form>
  )
}
