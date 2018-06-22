import {Component} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getNeighborhoods} from '@/redux/modules/neighborhoods/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {validTextColor, invalidTextColor} from './styles'

@connect((state) => ({neighborhoods: getNeighborhoods(state)}), null, null, {
  withRef: true
})
export default class ListingCreatedScreen extends Component {
  onClose = () => {
    const {params: {listing: {id}}} = this.props
    Navigation.setStackRoot(this.props.componentId, {
      component: {
        name: 'listings.Listing',
        passProps: {
          params: {id, editing: true}
        }
      }
    })
  }

  get isValidAddress() {
    const {neighborhoods, params: {address}} = this.props
    return (
      address.state === 'RJ' &&
      neighborhoods.findIndex((value) => value === address.neighborhood) !== -1
    )
  }

  renderMessage() {
    const valid = this.isValidAddress
    return (
      <View style={styles.container}>
        <Icon
          style={styles.icon}
          name={valid ? 'check-circle' : 'exclamation-triangle'}
          size={16}
          color={valid ? validTextColor : invalidTextColor}
        />
        <View style={styles.body}>
          <Text
            style={[
              styles.text,
              {
                fontWeight: '500',
                color: valid ? validTextColor : invalidTextColor
              }
            ]}
          >
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
  render() {
    return (
      <Shell>
        <Body>{this.renderMessage()}</Body>
        <Footer style={{padding: 15}}>
          <Button onPress={this.onClose}>
            Ok
          </Button>
        </Footer>
      </Shell>
    )
  }
}
