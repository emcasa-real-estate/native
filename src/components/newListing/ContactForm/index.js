import {PureComponent} from 'react'

import {required} from '@/lib/validations'
import Form, {Email, Phone, TextInput} from '@/components/shared/Form'

export default class ContactForm extends PureComponent {
  state = {value: undefined}

  static getDerivedStateFromProps({defaultValue}, {value}) {
    return {value: value || defaultValue}
  }

  requirePhoneOrEmail = () => {
    const {email, phone} = this.state.value
    if (!email && !phone) return 'Ao menos uma forma de contato é necessária'
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const {...props} = this.props
    return (
      <Form
        {...props}
        value={this.state.value}
        style={{margin: 15}}
        onChange={this.onChange}
      >
        <TextInput
          name="name"
          placeholder="Nome"
          returnKeyType="next"
          nextField="email"
          validations={[required('O nome é obrigatório')]}
        />
        <Email
          name="email"
          placeholder="Email"
          returnKeyType="next"
          nextField="phone"
          validations={[this.requirePhoneOrEmail, required(false)]}
        />
        <Phone
          name="phone"
          placeholder="Telefone"
          returnKeyType="next"
          nextField="message"
          validations={[this.requirePhoneOrEmail, required(false)]}
        />
        <TextInput
          multiline
          minHeight={120}
          name="message"
          placeholder="Mensagem"
        />
      </Form>
    )
  }
}
