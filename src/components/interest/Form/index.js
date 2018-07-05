import {Component} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Form from '@/components/shared/Form'
import InterestType from './Fields/InterestType'
import Fields from './Fields'
import styles from './styles'

export default class InterestForm extends Component {
  state = {
    activeType: undefined
  }

  onChangeType = (id) => this.setState({activeType: id})

  render() {
    const {types, ...props} = this.props
    const {activeType} = this.state

    return (
      <Form {...props}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Escolha a melhor forma para agendar sua visita
          </Text>
          <View style={styles.field}>
            <InterestType
              types={types}
              value={this.state.activeType}
              onChange={this.onChangeType}
            />
          </View>
          {activeType && <Fields type={activeType} />}
        </View>
      </Form>
    )
  }
}
