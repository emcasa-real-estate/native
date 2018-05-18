import {required} from '@/lib/validations'
import TextInput from '@/components/shared/Form/TextInput'
import styles from '../styles'

export default function Name(props) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Nome"
      validations={[required('O nome é obrigatório')]}
      {...props}
    />
  )
}
