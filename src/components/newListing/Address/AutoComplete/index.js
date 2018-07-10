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
    ({details, text} = {}) => {
      if (!details) return undefined
      else if (isNaN(text.streetNumber)) return 'O número é obrigatório'
      else if (!details.postalCode)
        return 'Não encontramos um endereço válido com esse número'
    }
  ]
})(
  Platform.select({
    ios: AutoCompleteIOS,
    android: AutoCompleteAndroid
  })
)
