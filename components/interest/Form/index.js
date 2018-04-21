import {Component} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Form from '@/components/shared/Form'
import InterestType from './Fields/InterestType'
import Fields from './Fields'
import styles from './styles'

const Divider = ({children}) => {
  return (
    <View style={styles.divider}>
      <View style={styles.line} />
      {children && <Text style={styles.dividerText}>{children}</Text>}
      {children && <View style={styles.line} />}
    </View>
  )
}

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
  }

  render() {
    const {types, onSubmit, onOpenCalendly} = this.props
    const {activeType} = this.state

    return (
      <Form onSubmit={onSubmit}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Escolha a melhor forma para agendar sua visita
          </Text>
          <Button raised color="lightgreen" onPress={onOpenCalendly}>
            Agendamento Online
          </Button>
          <Divider>OU</Divider>
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
