import TextInput from '@/components/shared/Form/TextInput'
import styles from '../styles'

export default function Message(props) {
  return (
    <TextInput
      autoCorrect
      multiline
      style={styles.input}
      placeholder="Mensagem (Opcional)"
      {...props}
    />
  )
}
