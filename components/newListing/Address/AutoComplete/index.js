import {Platform} from 'react-native'

import {required} from '@/lib/validations'
import {field} from '@/components/shared/Form/Field'
import AutoCompleteIOS from './AutoCompleteIOS'
import AutoCompleteAndroid from './AutoCompleteAndroid'

export default field({validations: [required('O endereço é obrigatório')]})(
  Platform.select({
    ios: AutoCompleteIOS,
    android: AutoCompleteAndroid
  })
)
