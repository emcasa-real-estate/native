import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Link from '@/components/shared/Link'
import Form, {Email, Password} from '@/components/shared/Form'
import styles from './styles'

const getError = (error) => {
  if (!error) return undefined
  switch (error.status) {
    case 401:
      return 'Senha ou email inválidos.'
    default:
      return 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
  }
}

export default function LoginForm({
  onPasswordRecovery,
  onSignUp,
  onSubmit,
  error
}) {
  const errorMessage = getError(error)
  return (
    <Form style={styles.container} onSubmit={onSubmit}>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Email name="email" />
      <Password name="password" />
      <View style={styles.inlineText}>
        <Link style={styles.text} onPress={onPasswordRecovery}>
          Esqueci a minha senha
        </Link>
      </View>
      <View style={styles.inlineText}>
        <Text style={styles.text}>Não tem cadastro?</Text>
        <Link style={styles.text} onPress={onSignUp}>
          Cadastre-se
        </Link>
      </View>
    </Form>
  )
}
