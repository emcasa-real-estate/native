import {Component} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Form from '@/components/shared/Form'
import InterestType from './Fields/InterestType'
import Fields from './Fields'
import styles from './styles'

const CALENDLY_ID = 5

export default class InterestForm extends Component {
  state = {
    activeType: undefined
  }

  constructor(props) {
    super(props)
    this.state.activeType = props.types[0].id
  }

  onChangeType = (id) => {
    this.setState({activeType: id})
    if (id === CALENDLY_ID) requestAnimationFrame(this.props.onOpenCalendly)
  }

  render() {
    const {types, onSubmit} = this.props
    const {activeType} = this.state

    return (
      <Form onSubmit={onSubmit}>
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
