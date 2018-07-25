import {PureComponent} from 'react'
import {View, FlatList, Animated} from 'react-native'

import * as colors from '@/assets/colors'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles from './styles'

const animated = (Target) =>
  class extends PureComponent {
    static displayName = `animated(${Target.displayName || Target.name})`

    state = {}

    constructor(props) {
      super(props)
      this.state.value = new Animated.Value(props.viewable ? 1 : 0)
    }

    componentDidUpdate(prev) {
      if (prev.viewable !== this.props.viewable) {
        const {value} = this.state
        value.stopAnimation()
        Animated.timing(value, {
          toValue: this.props.viewable ? 1 : 0
        }).start()
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          interpolate={(a = 0, b = 1) =>
            this.state.value.interpolate({
              inputRange: [0, 1],
              outputRange: [a, b]
            })
          }
        />
      )
    }
  }

const SellingPoint = animated(function _SellingPoint({
  text,
  icon,
  color,
  interpolate
}) {
  return (
    <Animated.View
      style={[styles.sellingPoint, {opacity: interpolate(0.3, 1)}]}
    >
      <Animated.View style={{transform: [{scale: interpolate(0.9, 1)}]}}>
        <Icon
          style={styles.sellingPointIcon}
          name={icon}
          fill={color}
          size={35}
        />
      </Animated.View>
      <Text style={[styles.text, styles.sellingPointText]}>{text}</Text>
    </Animated.View>
  )
})

const Step = animated(function _Step({text, step, interpolate}) {
  return (
    <Animated.View style={[styles.step, {opacity: interpolate(0.3, 1)}]}>
      <Animated.View
        style={[
          styles.stepIcon,
          {
            backgroundColor: interpolate(
              colors.gray.offWhite,
              colors.blue.medium
            ),
            borderColor: interpolate(colors.gray.dark, colors.blue.border),
            transform: [{scale: interpolate(0.9, 1)}]
          }
        ]}
      >
        <Animated.Text
          style={[
            styles.stepText,
            {color: interpolate(colors.gray.dark, 'white')}
          ]}
        >
          {step}
        </Animated.Text>
      </Animated.View>
      <Text style={[styles.text, styles.stepDescription]}>{text}</Text>
    </Animated.View>
  )
})

export default class LearnMore extends PureComponent {
  state = {
    viewableItems: []
  }

  data = [
    {
      Component: () => (
        <Text style={styles.title}>
          Anuncie e Venda seu imóvel no Rio de Janeiro com a EmCasa
        </Text>
      )
    },
    {
      Component: SellingPoint,
      icon: 'globe',
      color: colors.blue.medium,
      text: 'Tenha acesso imediato a milhares de compradores.'
    },
    {
      Component: SellingPoint,
      icon: 'gift',
      color: colors.red.medium,
      text:
        'Ganhe um Tour Virtual em 3D e atraia mais atenção para o seu imóvel.'
    },
    {
      Component: SellingPoint,
      icon: 'bolt',
      color: colors.orange.medium,
      text: 'Economize tempo e evite visitas desnecessárias em sua casa.'
    },
    {
      Component: SellingPoint,
      icon: 'usd-circle',
      color: colors.green.medium,
      text: 'Economize dinheiro com nossa comissão reduzida de 3%.'
    },
    {
      Component: SellingPoint,
      icon: 'paste',
      color: colors.gray.medium,
      text: 'Suporte em financiamento e retirada de FGTS.'
    },
    {
      Component: SellingPoint,
      icon: 'gavel',
      color: '#ea649c',
      text: 'Assistência jurídica grátis com documentação e processos.'
    },
    {
      Component: () => (
        <Text style={styles.title}>
          Cadastre seu imóvel{'\n'}em menos de 5 minutos
        </Text>
      )
    },
    {
      Component: Step,
      step: 1,
      text:
        'Cadastre-se na plataforma e preencha as informações básicas do seu imóvel'
    },
    {
      Component: Step,
      step: 2,
      text: 'Envie as fotos do imóvel e agende o nosso Tour Virtual 3D'
    },
    {
      Component: Step,
      step: 3,
      text: 'Envie os documentos e receba uma avaliação gratuita do seu imóvel'
    },
    {
      Component: () => (
        <View style={{alignItems: 'center'}}>
          <Text
            style={[
              styles.text,
              {fontSize: 15, marginBottom: 25, color: colors.green.medium}
            ]}
          >
            Pronto! Seu imóvel estará no ar e nossa equipe iniciará o processo
            de anúncio e venda de seu apartamento ou casa. Agora é aguardar
            nosso contato para agendamento das visitas com os interessados em
            comprar o seu imóvel.
          </Text>
        </View>
      )
    }
  ]

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  onViewableItemsChanged = ({viewableItems}) =>
    this.setState({
      viewableItems: viewableItems.map(({index}) => index)
    })

  renderItem = ({item: {Component, ...props}, index}) => {
    const {viewableItems} = this.state
    const isViewable = viewableItems.includes(index)
    return <Component {...props} viewable={isViewable} />
  }

  renderSeparator = ({leadingItem}) => {
    if (leadingItem.Component == SellingPoint)
      return <View style={styles.separator} />
    else return null
  }

  render() {
    return (
      <FlatList
        data={this.data}
        keyExtractor={(_, index) => String(index)}
        renderItem={this.renderItem}
        extraData={this.state}
        ItemSeparatorComponent={this.renderSeparator}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
      />
    )
  }
}
