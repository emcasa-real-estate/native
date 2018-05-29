import _ from 'lodash'
import {Platform} from 'react-native'

import {field} from '@/components/shared/Form/Field'
import AutoCompleteIOS from './AutoCompleteIOS'
import AutoCompleteAndroid from './AutoCompleteAndroid'

export default field({
  validations: [
    ({street}) => {
      if (_.isEmpty(street)) return 'O endereço é obrigatório'
    },
    ({streetNumber}) => {
      if (isNaN(streetNumber)) return 'O número é obrigatório'
    }
  ]
})(
  Platform.select({
    ios: AutoCompleteIOS,
    android: AutoCompleteAndroid
  })
)
