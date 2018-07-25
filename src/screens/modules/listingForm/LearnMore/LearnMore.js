import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {View, FlatList} from 'react-native'

import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

function SellingPoint({text, icon, color}) {
  return (
    <View style={styles.sellingPoint}>
      <Icon name={icon} color={color} size={25} />
      <Text style={styles.sellingPointText}>{text}</Text>
    </View>
  )
}

export default class LearnMore extends PureComponent {
  state = {
    visibleItems: []
  }

  data = [
    {
      icon: 'globe',
      color: colors.blue.medium,
      text: 'Tenha acesso imediato a milhares de compradores.'
    },
    {
      icon: 'gift',
      color: colors.red.medium,
      text:
        'Ganhe um Tour Virtual em 3D e atraia mais atenção para o seu imóvel.'
    },
    {
      icon: 'bolt',
      color: colors.orange.medium,
      text: 'Economize tempo e evite visitas desnecessárias em sua casa.'
    },
    {
      icon: 'usd-circle',
      color: colors.green.medium,
      text: 'Economize dinheiro com nossa comissão reduzida de 3%.'
    },
    {
      icon: 'file-contract',
      color: colors.gray.medium,
      text: 'Suporte em financiamento e retirada de FGTS.'
    },
    {
      icon: 'gavel',
      color: 'pink',
      text: 'Assistência jurídica grátis com documentação e processos.'
    }
  ]

  viewabilityOptions = {}

  renderItem = (data) => {
    return <SellingPoint {...data} />
  }

  renderFooter = () => {
    return (
      <View>
        <Text>eyy lmao</Text>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={this.data}
        keyExtractor={_.get('icon')}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
      />
    )
  }
}
