import {required} from '@/lib/validations'
import {field} from '@/components/shared/Form/Field'
import TextInput from '@/components/shared/TextInput'
import styles from '../styles'

function Name({onChange, ...props}) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Nome"
      onChangeText={onChange}
      {...props}
    />
  )
}

export default field({
  validations: [required('O nome é obrigatório')]
})(Name)
