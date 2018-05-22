import {required} from '@/lib/validations'
import Text from '@/components/shared/Text'
import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import Password from '@/components/shared/Form/Password'
import TextInput from '@/components/shared/Form/TextInput'
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

export default function SignUpForm({onSubmit, error, loading}) {
  const errorMessage = getError(error)
  return (
    <Form style={styles.container} onSubmit={onSubmit} loading={loading}>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        name="name"
        returnKeyType="next"
        nextField="email"
        placeholder="Nome"
        validations={[required('O nome é obrigatório')]}
      />
      <Email name="email" returnKeyType="next" nextField="phone" />
      <Phone
        name="phone"
        returnKeyType="next"
        nextField="password"
        placeholder="Telefone (opcional)"
        validations={[required(false)]}
      />
      <Password name="password" returnKeyType="done" />
    </Form>
  )
}
