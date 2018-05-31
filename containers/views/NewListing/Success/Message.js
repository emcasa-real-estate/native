import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import $styles, {validTextColor, invalidTextColor} from './styles'

function SuccessMessage({styles, valid}) {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name={valid ? 'check-circle' : 'exclamation-triangle'}
        size={16}
        color={valid ? validTextColor : invalidTextColor}
      />
      <View style={styles.body}>
        <Text style={[].concat(styles.text, styles.boldText)}>
          {valid
            ? 'Seu imóvel foi cadastrado com sucesso e está dentro da região que a EmCasa atende.'
            : 'Seu imóvel foi cadastrado com sucesso. Por enquanto, a EmCasa não está trabalhando na área do seu imóvel.'}
        </Text>
        <Text style={styles.text}>
          {valid
            ? 'Agora é só aguardar que a nossa equipe entrará em contato.'
            : 'Mas não se preocupe que entraremos em contato assim que chegarmos aí.'}
        </Text>
      </View>
    </View>
  )
}

export default $styles.inject()(SuccessMessage)
