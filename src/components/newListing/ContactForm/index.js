import {PureComponent} from 'react'

import {required} from '@/lib/validations'
import Form, {Email, Phone, TextInput} from '@/components/shared/Form'

export default class ContactForm extends PureComponent {
  state = {value: {}}

  requirePhoneOrEmail() {
    const {email, phone} = this.state.value
    if (!email && !phone) return 'Informa ao menos uma forma de contato'
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const {...props} = this.props
    return (
      <Form {...props} style={{margin: 15}} onChange={this.onChange}>
        <TextInput
          name="name"
          returnKeyType="next"
          nextField="email"
          validations={[required('O nome é obrigatório')]}
        />
        <Email
          name="email"
          returnKeyType="next"
          nextField="phone"
          validations={[this.requirePhoneOrEmail]}
        />
        <Phone
          name="phone"
          returnKeyType="next"
          nextField="message"
          validations={[this.requirePhoneOrEmail]}
        />
        <TextInput name="message" multiline />
      </Form>
    )
  }
}
