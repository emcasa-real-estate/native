import _ from 'lodash'
import {Platform} from 'react-native'

import {field} from '@/components/shared/Form/Field'
import AutoCompleteIOS from './AutoCompleteIOS'
import AutoCompleteAndroid from './AutoCompleteAndroid'

export default field({
  validations: [
    (address) => {
      if (_.isEmpty(address)) return 'O endereço é obrigatório'
    },
    ({details}) => {
      if (!details) return undefined
      else if (isNaN(details.street_number)) return 'O número é obrigatório'
      else if (!details.postal_code)
        return 'Não encontramos um endereço válido com esse número.'
    }
  ]
})(
  Platform.select({
    ios: AutoCompleteIOS,
    android: AutoCompleteAndroid
  })
)
