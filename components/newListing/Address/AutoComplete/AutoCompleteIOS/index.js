import {View} from 'react-native'

import {required} from '@/lib/validations'
import {field} from '@/components/shared/Form/Field'
import AutoComplete from '../AutoComplete'
import styles from './styles'

function AutoCompleteIOS(props) {
  return <AutoComplete styles={styles} {...props} />
}

export default field({validations: [required('O endereço é obrigatório')]})(
  AutoCompleteIOS
)
